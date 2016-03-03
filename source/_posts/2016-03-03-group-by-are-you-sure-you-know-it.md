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
## New MySQL version, YAY!
MySQL 5.7 is full of new functionalities, like virtual columns, virtual indexes and JSON fields! But, it came with some changes to the default configuration. When running:

```sql
SELECT @@GLOBAL.sql_mode;
```

We get:

```
ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```

What I want to talk about is the `ONLY_FULL_GROUP_BY` mode. That mode rejects queries where nonaggregated columns are expected but aren't on the `GROUP BY` or `HAVING` clause. Before MySQL 5.7.5, `ONLY_FULL_GROUP_BY` was disabled by default, now it is enabled.

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

On previous versions MySQL would solve this "magically". This is not MySQL being temperamental with you, it is them implementing SQL92 and SQL99 specifications to the database. To rely on results brought in the previous versions of that query is not smart. That result is unpredicable and totally arbitrary.

From the [5.6](http://dev.mysql.com/doc/refman/5.6/en/group-by-handling.html) documentation:

> MySQL extends the standard SQL use of GROUP BY so that the select list can refer to nonaggregated columns not named in the GROUP BY clause. This means that the preceding query is legal in MySQL. You can use this feature to get better performance by avoiding unnecessary column sorting and grouping. However, this is useful primarily when all values in each nonaggregated column not named in the GROUP BY are the same for each group. **The server is free to choose any value from each group**, so unless they are the same, the values chosen are indeterminate. Furthermore, the selection of values from each group cannot be influenced by adding an ORDER BY clause. Result set sorting occurs after values have been chosen, and ORDER BY does not affect which values within each group the server chooses.

## How I fix it?

It will make your query more verbose, but it will make it _right_. There are two ways of doing this.

One way is using aggregators in the fields you need retrieving and that will be grouped by the `email` field, for instance.

```sql
SELECT
  any_value(u.id)      AS user_id,
  any_value(u.name)    AS name,
  u.email,
  any_value(u.country) AS country,
  any_value(u.created) AS registration_date,
  max(c.created)       AS last_comment,
  count(*)             AS total_comments
FROM comments c
  INNER JOIN users u ON c.user_id = u.id
WHERE c.post_id = 1
GROUP BY u.email;
```

Another way is to name those fields that will be unique in the `GROUP BY` clause:

```sql
SELECT
  u.id           AS user_id,
  u.name,
  u.email,
  u.country,
  u.created      AS registration_date,
  max(c.created) AS last_comment,
  count(*)       AS total_comments
FROM comments c
  INNER JOIN users u ON c.user_id = u.id
WHERE c.post_id = 1
GROUP BY u.email, u.id, u.name, u.country, u.created;
```

Result for both queries:

```
+---------+---------------+----------------------+---------+---------------------+---------------------+----------------+
| user_id | name          | email                | country | registration_date   | last_comment        | total_comments |
+---------+---------------+----------------------+---------+---------------------+---------------------+----------------+
|       2 | Bart Simpson  | bart@simpsons.com    | US      | 2016-03-03 20:07:28 | 2016-03-03 21:21:08 |              2 |
|       1 | Lisa Simpson  | lisa@simpsons.com    | US      | 2016-03-03 20:07:23 | 2016-03-03 21:20:50 |              2 |
|       3 | Homer Simpson | nobrain@simpsons.com | US      | 2016-03-03 20:07:38 | 2016-03-03 21:20:56 |              1 |
+---------+---------------+----------------------+---------+---------------------+---------------------+----------------+
3 rows in set (0.00 sec)
```

In another words, both queries follows [SQL92](http://dev.cs.uni-magdeburg.de/db/sybase9/help/dbugen9/00000284.htm) specification:

> The SQL/92 standard for GROUP BY requires the following:

> * A column used in an expression of the SELECT clause must be in the GROUP BY clause. Otherwise, the expression using that column is an aggregate function.
> * A GROUP BY expression can only contain column names from the select list, but not those used only as arguments for vector aggregates.

> The results of a standard GROUP BY with vector aggregate functions produce one row with one value per group.

In the 5.7.5 version, MySQL also implemented SQL99, which means that if such a relationship exists between name and id, the query is legal. This would be the case, for example, were you group by a primary key or foreign key:

```sql
SELECT
  u.id           AS user_id,
  u.name,
  u.email,
  u.country,
  u.created      AS registration_date,
  max(c.created) AS last_comment,
  count(*)       AS total_comments
FROM comments c
  INNER JOIN users u ON c.user_id = u.id
WHERE c.post_id = 1
GROUP BY u.id;
```

You can read more details about how MySQL handles `GROUP BY` on their [documentation](http://dev.mysql.com/doc/refman/5.7/en/group-by-handling.html).

## TL;DR;

According to the documentation, this configuration is being enabled by default because `GROUP BY` processing has become more sophisticated to include detection of functional dependencies. It also brings MySQL more close to the best practices for SQL language with the bonus of removing the "magic" element when grouping.

## Disabling ONLY_FULL_GROUP_BY

If you are upgrading your database server and want to avoid any possible breaks you can disable by removing it from your `sql_mode`;

```sql
SET @@GLOBAL.sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'
```

A restart is not necessary, but a reconnection is.
