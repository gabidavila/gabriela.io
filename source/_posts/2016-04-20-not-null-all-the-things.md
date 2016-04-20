---
title: NOT NULL all the things!
draft: false
date: "2016-04-20"
author: gabriela
categories:
- Article
tags:
- mysql
- postgres
- mysql 5.7
- NULL
- NOT NULL
- NO_ZERO_DATE
use:
- posts_tags
- posts_categories
---

# `NOT NULL` all the things!

Different types of languages deal with this "value" in diverse ways. You can have a more comprehensive list of what `NULL` can mean on [this website](http://c2.com/cgi/wiki?WhatIsNull). What I like to think about `NULL` is along the lines of _invalid_, as if some sort of garbage is stored there. It doesn't mean it's empty, it's just mean that something is there, and it has no value to you.

Databases deal when storing this type in a similar way, [PostgreSQL](http://www.postgresql.org/docs/9.5/static/functions-comparison.html) treats it as "_unknown_" while [MySQL](http://dev.mysql.com/doc/refman/5.7/en/null-values.html) treats it as "_no data_".

Both databases recommend using `\N` to represent `NULL` values where import or exporting of data is necessary.

## When to use it

You don't. Particularly, I **DON'T** recommend using `NULL`.

> `NULL` doesn't mean **empty**

 So if you want to represent lack of data or optional fields use a default value. It's bad sign of architecture having NULLABLE fields, there is an extra case to test and to write for. It adds unnecessary complexity.

 However, there is one case where I do think `NULL` is acceptable. And that is when working with MySQL date related fields. I will talk more about this further down.

## How to Query it

MySQL doesn't recognize `field = NULL` because, remember, `NULL` means **invalid**, _not_ empty. Thus using it will not return any rows.

As much as `NULL` value will never be equal to another `NULL`, when using `ORDER BY`, `GROUP BY` and `DISTINCT`, the server interprets the values as equal. Aggregators functions such as `MIN()`, `SUM()` and `COUNT()` ignore `NULL` values, except for `COUNT(*)` that counts rows, and not columns.

When using `ORDER BY` a column is nullable the `NULL` values appear first if instructed as `ASC` and in the end if `DESC` is requested.

PostgreSQL on the other hand has an option to convert equal comparisons expressions to `field IS NULL`, if enabled ([transform_num_equals](http://www.postgresql.org/docs/9.5/static/runtime-config-compatible.html#GUC-TRANSFORM-NULL-EQUALS)).

The ordering for `ORDER BY` depends on indexing of the field, by default `NULL` comes first, but you can specify when creating an index where the `NULL` values should be: top or bottom.

For aggregators functions, PostgreSQL works the same way.

## Performance

Having `NOT NULL` columns permits similar performance on MySQL as an `column = 1` do. However that doesn't happen in `LEFT JOIN` operations while a field could be `NULL`. But this is for the type of queries where `IS NULL` is used:

```sql
# Assuming that `active` column is NOT NULL
SELECT * FROM users WHERE active = 1 OR active IS NULL;
```

Summing up directly from MySQL documentation:

> Declare columns to be `NOT NULL` if possible. It makes SQL operations faster, by enabling better use of indexes and eliminating overhead for testing whether each value is `NULL`. You also save some storage space, one bit per column. If you really need `NULL` values in your tables, use them. Just avoid the default setting that allows `NULL` values in every column.

### The `COALESCE()` function

This function return the first non-null result of a column. Keep in mind to perform this operation on non-indexed columns. It is slow by its nature, just a friendly warning of when you are using to be mindful of its fallback.

## The exception to the rule

I think this applies to MySQL databases. `DATE/DATETIME` _should not_ be allowed to be `NULL` if, and _only_ if the `sql_mode` directive `NO_ZERO_DATE` is enabled.

What does it mean? `NO_ZERO_DATE` allows for `0000-00-00` to be inserted in a `DATE/DATETIME`. MySQL 5.7 `sql_mode` insures some restrictions into the database by default. If for instance you have `DATE` column that is `NOT NULL` and doesn't pass a value to it, `0000-00-00` will be saved, because the column is `NOT NULL`, **BUT** will give a warning:

```
mysql> DESCRIBE users;
+------------+------------------+------+-----+---------+----------------+
| Field      | Type             | Null | Key | Default | Extra          |
+------------+------------------+------+-----+---------+----------------+
| id         | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| name       | varchar(45)      | NO   |     | NULL    |                |
| created_at | datetime         | NO   |     | NULL    |                |
+------------+------------------+------+-----+---------+----------------+
3 rows in set (0.00 sec)

mysql> INSERT INTO users (name) VALUES ('Gabi');
Query OK, 1 row affected, 1 warning (0.01 sec)

mysql> SHOW WARNINGS;
+---------+------+-------------------------------------------------+
| Level   | Code | Message                                         |
+---------+------+-------------------------------------------------+
| Warning | 1364 | Field 'created_at' doesn't have a default value |
+---------+------+-------------------------------------------------+
1 row in set (0.00 sec)
```

Making this operation to make sure no zero date will be allowed as it is by default in MySQL 5.7:

```sql
SET @@GLOBAL.sql_mode = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION,NO_ZERO_DATE';
```

When trying to insert a similar query:

```
mysql> INSERT INTO users (name) VALUES ('Blossom');
ERROR 1364 (HY000): Field 'created_at' doesn't have a default value
```

## To sum it up

If you have MySQL **and** `NO_ZERO_DATE` is in your `sql_mode`, you should **ALWAYS** use `NOT NULL`. MySQL 5.7 brings the mode enabled by default among with other things, read more [here](http://gabriela.io/blog/2016/03/03/group-by-are-you-sure-you-know-it/).

If you don't have it enabled for any other reason, then `DATE/DATETIME` **MAY** be `NULL`, because _data integrity_ > _performance_ in this case.

Again, `0000-00-00` **IS NOT** a valid date.