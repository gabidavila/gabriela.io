---
title: Data Warehouse Experimenting
draft: false
date: "2014-12-07"
author: gabriela
categories:
- Article
tags:
- data warehouse
- oltp
- olap
use:
- posts_tags
- posts_categories
---

##Intro

<img src="http://www.thecomicstrips.com/properties/speedbump/art_images/sb1061208.jpg" class="pull-left" style="margin: 10px">

I had the opportunity to work with a variety of databases: [Firebird](http://www.firebirdsql.org/) (yeap!), [MySQL](http://www.mysql.com/), [Postgres](http://www.postgresql.org/), [Oracle](http://www.oracle.com/) and [SQL Server](http://www.microsoft.com/en-us/server-cloud/products/sql-server/default.aspx). And to count the NoSQL ones I was able to work with [MongoDB](http://www.mongodb.org/) and [DynamoDB](http://aws.amazon.com/dynamodb/).

I have different opinions about each one of the above (note that I didn't include Access on the list, as far as I know, that is not a database). Also, it is not secret that I like Amazon AWS products, and using some of them daily I can see why each service can be magically integrated to achieve a goal.


My goal right now is to get [Amazon Redshift](http://aws.amazon.com/redshift/) working with my current RDBMS and NoSQL sources. A lot of work lies ahead. Because of that I am sharing with you what I am learning by using it. But first things first: the knowledge shared ahead can be used with any data warehouse technology. A data warehouse basically is a summarized database.

##OLTP

**OLTP** is the short term for _OnLine Transaction Processing_.

Most applications work with an OLTP model. Because we learn that tables must be normalized to avoid data redundancy, one of the advantages this approach brings is the easiness to do a data change: operations of INSERT, UPDATE and DELETE are made without problems.

So here we have our typical RDBMS databases or even NoSQL, but the most important thing to remember about OLTP is that it is *realtime*. The application interacts with it in real time.

Things start to get a little more complicated when even a simple report is needed and it takes forever to run a query or you have so much rows in that N x N table that is practically impossible to read it efficiently. For that, OLAP models support faster reads.

##OLAP

**OLAP** is the short term for _OnLine Analytical Processing_.

This is not a system I commonly see in small software companies, usually the big ones use it because requires a lot more care and investment to be able to do the necessary analysis.

Although some market RDBMS come with tools to help with the data denormalization, this is not that common. You could say that an OLAP system reads from one, or more, OLTP systems. I know Firebird, SQL Server and Oracle all have computed columns, it is a nice way to have some preprocessed data in your database, and a computed column is a virtual column. MySQL and Postgres don't have that feature (it can take a toll on performance).

Because of that, it is much more complex to do the CRUD operations with this system. You can read really fast, but to update your fact table, you probably need to create an ETL (Extract, Transform, Load) process to import the information. Generally this process is automated and scheduled.

Usually this kind of system comes with a lot of complex queries and grouping, most BI tools (Pentaho, Tableau, etc.) use an OLAP as their primary source. This system works with structured data with dimensions, it is often called a **data cube**.

<a href="img/2014/12/oltp-olap.png" title="OLTP to OLAP" target="_blank">
<img src="img/2014/12/oltp-olap.png" class="align-center img-responsive" alt="visio">
</a>

##Big Data

So now this is hard to explain. It is not suitable for every company as an OLAP could be, and in real life I only saw one case where it was actually needed (also the high cost of a project with Big Data is not affordable for small and mid size companies). But honestly, I think this cartoon defines the feeling for a grand portion of the market:

![Big Data Cartoon](http://www.socmedsean.com/wp-content/uploads/2013/08/big-data-social-media-comic.png)

Most of the data presented is unstructured, so the challenge here is a way to analyze it on a way that you can get a monetary return there. There are some people around saying that currently Big Data is more about the technology, not about the data, information is still too controversial at this point.

## OLTP x OLAP x Big Data

Although you can use an OLTP system without an OLAP, the inverse is not true, so it is not like you have to choose which one to use for your application, the only choice you have to is make whether you need a data warehouse or not.

In a way a Big Data could take over a OLAP cube, but I think there is a long path to be followed before that, and again, the costs are pretty different from one to another.

## Why Redshift?

Amazon Redshift is an OLAP technology to work with an immense amount of data in a columnar way. It uses a Postgres storage, but this is not your typical Postgres database. And at the financial side is pretty much cheaper than Oracle and Microsoft solutions.

You can create a cluster of databases with Redshift and have scalable and fast access with high I/O to get your data. Also integrates fairly easy with RDS and DynamoDB, but it is not exclusive to that.

You **must** not use it as an RDBMS to store your transactions since it doesn't constrain the table relationships. Those relationships are used for index purposes, not data consistency.

Next blog post I will try to explain how to work it and how to assert your fact tables and dimensional tables to make sure you don't get performance issues with it.
