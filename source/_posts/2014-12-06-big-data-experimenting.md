---
title: Big Data Experimenting
draft: false
date: "2014-12-06"
author: gabriela
categories:
- Article
tags:
- big data
- oltp
- olap
use:
- posts_tags
- posts_categories
---

##Intro

I had the opportunity to work with a gama of databases: Firebird (yeap!), MySQL, Postgres, Oracle and SQL Server. And to count the NoSQL ones I was able to work with MongoDB and DynamoDB.

I have different opinions about each one of the above, note that I didn't include Access on the list, that is not a database. I didn't stayed with the CRUD routine. That kind of job is boring.

But one thing I learn from all these years is that a poor database design is a major bottleneck for applications.

##OLTP

**OLTP** is the short term for _OnLine Transaction Processing_.

Most applications work with an OLTP model. Because we learn that tables must be normalised to avoid data redundancy, one of the advantages this approach brings is the easiness to do a data change: operations of INSERT, UPDATE and DELETE are made without problems.

But things start to get a little more complicated when even a simple report is needed and it takes forever to run a query or you have so much rows in that N x N table that is pratically impossible to read it efficiently. For that, OLAP models are more fast to read.

##OLAP

**OLAP** is the short term for _OnLine Analytical Processing_.

This is not a system I commonly see in small softwares. Usually big companies uses it because it requires a lot more of care and investment to be able to do the necessary analysis.

Although some market RDBMS come with tools to help with the data denormalisation, this is not that common. You could say that an OLAP system read from one, or more, OLTP system. I know Firebird, SQL Server and Oracle all have computed columns, it is a nice way to have some preprocessed data in your database, and a computed column is a virtual column. MySQL and Postgres doesn't have that feature (it can take a toll on performance).

Usually this kind of system come with a lot of complex queries and grouping, most BI tools use an OLTP as their primary source. This system works with structured data with dimensions, it is often called a **data cube**.

##Big Data

So now this is hard to explain. It is not suitable for every company as an OLAP could be, and in real life I only saw one case where it was actually needed (also the high cost of a project with big data is not affordable for small and mid size companies). But honestly, I think this cartoon define the feeling for a grand portion of the market:

![Big Data Cartoon](http://www.socmedsean.com/wp-content/uploads/2013/08/big-data-social-media-comic.png)

## OLTP x OLAP x Big Data

Although you can use an OLTP system without an OLAP, the inverse is not true, so it is not like you have to choose which one to use for your application, the only choice you have is to choose if you need an OLAP or not.
