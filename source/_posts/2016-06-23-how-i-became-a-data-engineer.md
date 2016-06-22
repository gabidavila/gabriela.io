---
title: How I became a Data Engineer
draft: false
date: "2016-06-23"
author: gabriela
categories:
- Article
tags:
- Data Engineering
- Software Development
use:
- posts_tags
- posts_categories
---
Pardon me if my memory fails a bit, I am trying to recount the events as they happened, but my memory is not my strongest suit.

I think I had a bit of different path than most PHP Software Developers. My first job was at a company that had their own CRM and they wanted a web version of some parts of the system. At that time, I had only “experience” with ASP and Microsoft Access (I know, tough). They wanted it to be with PHP, the difference I think came when they said they wanted the integration to run directly into the database. The web app would write directly into the DB. The CRM system was written using Delphi and Firebird. So I learned the PHP and my first database wasn’t MySQL (I don’t count MS Access as a DB). After that I got a job which MySQL was used, it was a bit weird at the time learning that MyISAM (I was really fresh on MySQL, and I didn’t know about the engines and such) didn’t had foreign keys for instance.

After that I got a job in a huge multinational where they had this project of migrating every Excel spreadsheet to a PHP program, VBA was heavily used there and they had entire programs running into that, what they didn't tell us was that was cheaper for them having a whole team of PHP developers doing an internal system then have the features built into their ERP. But for “security” reasons, no business logic could be inside the PHP code, so I had to do tons of Stored Procedures. They also had integrations with MS SQL Server, the workflow system used it together with a PHP tool called [Scriptcase](www.scriptcase.net).

Another job I had was with another multinational where I had to do a program to read from various sources and store in a DB for later reports and all, that would be a “scratch” of an [ETL](https://en.wikipedia.org/wiki/Extract,_transform,_load) (Extract, Transform, Load) but at the time I wasn’t really well versed and data warehouse techniques. For that job I used PostgreSQL. In the same company we later on did [Magento](http://www.magento.org) white label stores for our clients (other big companies) and it had to have integration to our ERP, differently from my first job, the integration was through a Service Bus written in Java and the ERP had Oracle as DB.

I could go on and on to every job I had, so when I said my path was a bit different, I say that because most of my jobs were at companies considered corporate ones, and that put me into contact with many flavours of Relational Databases and NoSQL too (MongoDB, Dynamo and Cassandra being the main ones).

In the end, that kind of exposure made me be the “DB” person among my fellow engineers, and everything considered more than a [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) to it would fall into my lap. And I would be happy with it, I noticed that other developers didn't like much doing database tasks. One of my employers noticed my interest on it and how quickly I became familiarised with the schema and our data architecture. Our main relational database had millions and millions of records, terabytes and they created a Data Team to make it more efficient. We would create workers to sync data into Elasticsearch for instance. I was still a PHP Developer officially, but mainly curating the DB and doing workers with NodeJS (we needed the async and the indexing time was crucial for business).

That’s when I discovered that I wanted to work with data, I didn’t have any idea of what kind of title that would be, I knew I didn’t want to be a DBA, too much infrastructure involved on it and that didn’t sound fun for me. Once the opportunity to work officially as a Data Engineer appeared, I grabbed it with my both hands and I _knew_ it was right.
