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

Suppose I want to list the users and the count of how many comments they made. This is the query most people use:

```sql
SELECT
  u.*,
  count(*) AS total
FROM users u
  INNER JOIN comments c ON c.user_id = u.id
GROUP BY u.id;
```

And this is the result:

```
+----+---------------+----------------------+---------+---------------------+-------+
| id | name          | email                | country | created             | total |
+----+---------------+----------------------+---------+---------------------+-------+
|  1 | Lisa Simpson  | lisa@simpsons.com    | NULL    | 2016-03-03 20:07:23 |     2 |
|  2 | Bart Simpson  | bart@simpsons.com    | NULL    | 2016-03-03 20:07:28 |     2 |
|  3 | Homer Simpson | nobrain@simpsons.com | NULL    | 2016-03-03 20:07:38 |     1 |
+----+---------------+----------------------+---------+---------------------+-------+
3 rows in set (0.00 sec)
```
