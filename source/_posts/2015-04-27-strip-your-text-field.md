---
title: Strip your TEXT Field
draft: false
date: "2015-04-27"
author: gabriela
categories:
- Article
tags:
- database
- mysql
- text field
use:
- posts_tags
- posts_categories
---
TEXT fields are a nightmare. For you and for your server. It is slow to retrieve, and if you are doing searches on it, be prepared, things are going to get bumpy.

<p style="text-align:center">
<img alt="mad rigby" src="http://gabriela.io/img/2015/04/rigby_pc.gif"> 
</p>

If you use MySQL with a MyISAM engine, this may not be an issue for you, you can create a `FULLTEXT` index, your only problem is if you want to add a new column, an alter table can take forever, since MySQL creates a new table and copies the old data to the new table. For those who uses MySQL with an InnoDB engine, prepare because, you'll have more issues. Indexes **can't** be `FULLTEXT` and if you do need an index  you must inform the length of it. It defeats the purpose of you doing the search in that field.

## My TEXT field is not searchable, I just use it to store a big string

In that case you will only have trouble when it comes the time to add a new column or index to that table. As I said, when executing an `ALTER TABLE` statement, MySQL will create a new table with the new modifications and reinsert the data. Once I did this in a huge table with a TEXT field, it took 2 days. So, be careful.

Maintenance can be an issue too and I had problems in the past with MyISAM corrupting table and losing a lot of data. In the new versions of MySQL things seems to have changed, I think since the 5.1 version I didn't face that again.

## Why the statement `LIKE` is so slow?

Take this table as example:

```sql
CREATE TABLE `options` (
  `id` INT,
  `user_id` INT,
  `value` TEXT,
  `created` DATETIME
) DEFAULT CHARSET=utf8;
```

Well, one of the first things we learn when programming is that reading from the hard disk is costly while reading from the memory is super fast. For every row stored in a table like the one above, the field `value` will not be stored inline like the `id` value. It will store a reference to a file containing the actual data, MySQL stores 4MB of data into a TEXT field.

Having that in mind, every time you use a `LIKE` statement you are reading from your server disk, which is pretty slow (you can have a super server with high IOPS, but this is not the case for the majority). Unless you use the MyISAM engine and create a `FULLTEXT` index into the `value` field:

```sql
ALTER TABLE `options`
ADD FULLTEXT INDEX `ix_value` (`value` ASC);
```

## Alternatives

### Making the search fast

The best solution it is to use a search service like [Elastic](https://www.elastic.co) (previously known as ElasticSearch) or [CloudSearch](http://aws.amazon.com/cloudsearch/). This of course will add another layer to your application, but it is a good tradeoff.

You will need to index the data through one of the services in an extra step of the table insert. One thing for sure, the search will be FAST!

<p style="text-align:center">
<img alt="Jake omg" src="http://gabriela.io/img/2015/04/ohh_adventure_time.gif">
</p>

### Making the retrieval fast (no search)

You can do what the database does already: store a reference in the `value` field for a text file. Ideally this text file would be stored in a CDN like [Akamai](http://www.akamai.com) or [Amazon S3](http://aws.amazon.com/s3/).

### Storing in the database

If you don't want to add another layer, you can achieve a compromise by removing the TEXT field from the table and adding it to a second one.

It would look like this:

```sql
CREATE TABLE `options` (
  `id` INT,
  `user_id` INT,
  `created` DATETIME
)Engine=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `options_text` (
`option_id` INT,
`value` TEXT
) Engine=MyISAM DEFAULT CHARSET=utf8;
```

That way you can create a `FULLTEXT` index in the table, because it is MyISAM and still be able to work with better data consistency provided by InnoDB.

To retrieve it, a `INNER JOIN` or `LEFT JOIN` between the two tables:

```sql
SELECT
    `options`.`id` AS id,
    `options`.`user_id` AS user_id,
    `options`.`created` AS created,
    `options_text`.`value` AS value
FROM
    `options`
        INNER JOIN
    `options_text` ON `options`.`id` = `options_text`.`option_id`
```
Don't be fooled, the search into `options_text` will *still* be slow, but it will be better than if it all were stored in the same table.

## Conclusion

There is not a *right way* of doing this, you must consider all the implications of either approach and see what works better for you.

Keep this in mind: the first two proposed ideas need to add an extra step in the CRUD operations, and only you know how problematic can be to mess with that in a legacy application, for example. You won't have much trouble to implement with a clean code.

I recommend you read more about BLOB and TEXT fields performance and storage in this article from [Peter Zaitsev](http://www.percona.com/blog/2010/02/09/blob-storage-in-innodb/) in the Percona blog.

<p style="text-align:center">
<img alt="Jake and Finn, nice" src="http://gabriela.io/img/2015/04/nice_jake_and_fin.gif">
</p>
