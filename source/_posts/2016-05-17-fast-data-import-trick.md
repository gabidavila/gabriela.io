---
title: Fast data import trick
draft: false
date: "2016-05-17"
author: gabriela
categories:
- Article
tags:
- MySQL
- INSERT
- file import
- LOAD FILE
use:
- posts_tags
- posts_categories
---

A few weeks ago my friend [Frank de Jonge](http://www.twitter.com/frankdejonge) told me he managed to improve an import into a MySQL server down from more than 10 hours to 16 minutes. According to him it had something to do with one of the field types (too long fields to really small data) and the amount of indexes and constraints in the tables. We were talking about 1 million records here. He wondered if it was possible to make it even faster.

## The basics 

Turns out there are many ways of importing data into a database, it all depends where are you getting the data from and where you want to put it. Let me give you a bit more context: you may want to get data from a legacy application that exports into CSV to your database server or even data from different servers.

If you are pulling data from a MySQL table into another MySQL table (lets assume they are into different servers) you might as well use `mysqldump`.

To export a single table:

```bash
$ mysqldump -h localhost -u root -p --extended-insert --quick --no-create-info mydb mytable | gzip > mytable.sql.gz
```

A bit more about this line:
* `--extended-insert`: it makes sure that it is not one `INSERT` per line, meaning a single statement can have dozens of rows.
* `--quick`: useful when dumping large tables, by default MySQL reads the whole table in memory then dumps into a file, that way the data is streamed without consuming much memory.
* `--no-create-info`: this means only the data is being exported, no `CREATE TABLE` statements will be added

## The complex

The problem my friend faced was a bit more complex. He needed to generate the dump file due to the source of his data coming from somewhere else (Later on I advised him on the benefits of `LOAD FILE`), but since 90% of his work was already done he wanted to know:

>  Why when I do blocks of 50 rows to be inserted is it faster then when I do with 500?

There could be N reasons for that:

* buffering 500 rows into memory is slower than 50, remember, you are reading from the disk, it is **always** slow.
* if no transactions are used, the indexes gets rebuilt after the end of each `INSERT`, to 1 million rows at a 50 values per statement we have 20k `INSERT`s, while with 500 it would be 2k statements. My _speculation_ here is that indexes in InnodB engine are BTREE, slowling building means that you "know" where the values are in the tree, so it's a fast search to sort and organise while with 500 items you need to reorganise a lot of information at once. Again, this is an _speculation_.

## Suggestions

### Transactions 

My first suggestion was: wrap everything in a single transaction. Put a `START TRANSACTION` in the beginning and at the end a `COMMIT` statement. That way you do the rebuilding of the indexes and foreign key checks at the end of the script.

He reported a minor improvement on performance.

### The Danger

I knew from the begining a way where his import would be really fast, but since the source of his data wasn't as secure as the database itselft it could result in duplicated data, missing foreign keys, it could end really really bad.

MySQL by default when you use `mysqldump` put this option in place because it's fair to assume you are going to be importing this to an empty database, so no data integrity problems. Which wasn't the case.

The data was manipulated to be inserted, so the trick I said to him was and I quote:

```sql
SET foreign_key_checks = 0;
/* do you stuff REALLY CAREFULLY */
SET foreign_key_checks = 1;
```

The import went from **16 min** to **6 min**. [He got super happy :D](https://twitter.com/frankdejonge/status/723592441786437632):

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I was super pleased about cutting the a DB import down from 10 hours to 16 minutes. Then <a href="https://twitter.com/gabidavila">@gabidavila</a> gave tips which brought it down to 6m.</p>&mdash; Frank de Jonge (@frankdejonge) <a href="https://twitter.com/frankdejonge/status/723592441786437632">April 22, 2016</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

And people on the internet got curious (because Frank is famous now, apparently):

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/frankdejonge">@frankdejonge</a> <a href="https://twitter.com/gabidavila">@gabidavila</a> please write a blogpost about how you managed to do that :)</p>&mdash; Freek Van der Herten (@freekmurze) <a href="https://twitter.com/freekmurze/status/723896806107697152">April 23, 2016</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/freekmurze">@freekmurze</a> <a href="https://twitter.com/frankdejonge">@frankdejonge</a> <a href="https://twitter.com/gabidavila">@gabidavila</a> i&#39;m curious About that technique aswell. Can you share?</p>&mdash; Peter Steenbergen (@petericebear) <a href="https://twitter.com/petericebear/status/723901190715654145">April 23, 2016</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I confess it was fun to see the time cut down and more than half, but use with **caution**.

## An even more faster way

`CSV` files. Yes, that's faster. Specifically `TSV`, since any string can have a comma. 

[To generate](http://dev.mysql.com/doc/refman/5.7/en/mysqldump.html#option_mysqldump_tab):

```bash
$ mysqldump -h localhost -u root -p --tab=/tmp mydb mytable 
```

Or if you are manipulating the data yourself from another source, don't forget to use `\N` for `NULL` values.

[To Read](http://dev.mysql.com/doc/refman/5.7/en/load-data.html):
```
$ mysql -h localhost -u root -p 
mysql> LOAD DATA INFILE '/tmp/mytable.txt' INTO TABLE mytable;
Query OK, 881426 rows affected (29.30 sec)
Records: 881426  Deleted: 0  Skipped: 0  Warnings: 0
```

The same data with bulk `INSERT`s took over a minute. There are many variables when dealing with that statement such as buffer size, the checking of the keys itself, so for **high volume** data importing straight from a text file is still the fastest option.

## Conclusion

As I said before, it was just a matter of disabling the constraint check in the script. Only do that if you are sure the data is good, else, other options like `net_buffer_length`, `max_allowed_packet` and `read_buffer_size` can help you import big SQL files. Also in most cases this should be considered: Data Integrity > Performance.