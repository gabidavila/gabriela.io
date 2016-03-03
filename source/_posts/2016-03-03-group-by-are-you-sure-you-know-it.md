---
title: GROUP BY, are you sure you know it?
draft: false
date: "2016-03-03"
author: gabriela
categories:
- Article
tags:
- mysql
- mysql 5.7
- group by
- ONLY_FULL_GROUP_BY
use:
- posts_tags
- posts_categories
---
## You know the drill...

This is a simple statement, people use it everywhere, it shouldn't be that hard to use, right?

Given the following schema:

```sql
--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `id`      INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`    VARCHAR(255)              DEFAULT NULL,
  `email`   VARCHAR(255)              DEFAULT NULL,
  `country` CHAR(2)                   DEFAULT NULL,
  `created` TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id`      INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) UNSIGNED NOT NULL,
  `post_id` INT(11)                   DEFAULT NULL,
  `message` TEXT,
  `created` TIMESTAMP        NULL     DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_comments_user_id` (`user_id`),
  CONSTRAINT `fk_comments_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE = InnoDB;
```

Suppose I want to list all users that commented on `post_id = 1`, MySQL 5.6:

```sql
SELECT *
FROM comments c
  INNER JOIN users u ON c.user_id = u.id
WHERE c.post_id = 1
GROUP BY c.user_id;
```

And this is the result:

```
+----+---------+---------+---------+---------------------+----+---------------+----------------------+---------+---------------------+
| id | user_id | post_id | message | created             | id | name          | email                | country | created             |
+----+---------+---------+---------+---------------------+----+---------------+----------------------+---------+---------------------+
|  1 |       1 |       1 | NULL    | 2016-03-03 21:20:29 |  1 | Lisa Simpson  | lisa@simpsons.com    | US      | 2016-03-03 20:07:23 |
|  2 |       2 |       1 | NULL    | 2016-03-03 21:20:39 |  2 | Bart Simpson  | bart@simpsons.com    | US      | 2016-03-03 20:07:28 |
|  4 |       3 |       1 | NULL    | 2016-03-03 21:20:56 |  3 | Homer Simpson | nobrain@simpsons.com | US      | 2016-03-03 20:07:38 |
+----+---------+---------+---------+---------------------+----+---------------+----------------------+---------+---------------------+
3 rows in set (0.00 sec)
```

Same query running on 5.7.11 gives the following results:

```
[42000][1055] Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'blog.c.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
```

## What does it mean?

What MySQL is complaining about here is this: you grouped lines by `c.user_id`, but problem is, there are more than one result to be retrieved for the `c.id` column, since you didn't use any aggregators, as `min(c.id)` for instance, it doesn't know which result to bring.

On previous versions MySQL would solve this "magically". This is not MySQL being temperamental with you, it is them implementing ANSI specification to the database. To rely on results brought in the previous versions of that query is not smart. That result is unpredicable and totally arbitrary.

From the [5.6](http://dev.mysql.com/doc/refman/5.6/en/group-by-handling.html) documentation:

> MySQL extends the standard SQL use of GROUP BY so that the select list can refer to nonaggregated columns not named in the GROUP BY clause. This means that the preceding query is legal in MySQL. You can use this feature to get better performance by avoiding unnecessary column sorting and grouping. However, this is useful primarily when all values in each nonaggregated column not named in the GROUP BY are the same for each group. The server is free to choose any value from each group, so unless they are the same, the values chosen are indeterminate. Furthermore, the selection of values from each group cannot be influenced by adding an ORDER BY clause. **Result set sorting occurs after values have been chosen, and ORDER BY does not affect which values within each group the server chooses.**
