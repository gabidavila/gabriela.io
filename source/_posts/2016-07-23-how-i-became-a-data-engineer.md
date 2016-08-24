---
title: How I became a Data Engineer
draft: false
date: "2016-07-23"
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
*A reminiscence of a personal timeline of events; please, excuse minor errors and/or let me know if my memory has shuffled things around a bit.*

My first job was at a company that had their own CRM and they wanted a web version of some parts of the system. At that time, I only had “experience” with ASP and Microsoft Access (I know, tough). They wanted the web version in PHP, their reasoning, I think, being that they wanted the integration to run directly into the database. The web app would write directly into the DB. The CRM system was written using Delphi and Firebird. So I learned PHP and my first database, which wasn’t MySQL (I don’t count MS Access as a DB). After that I got a job in which MySQL was used.  I was really fresh on MySQL, and I didn’t know about the engines and such, so it was a bit weird learning about MyISAM (which didn’t have foreign keys for instance).

After that I got a job in a huge multinational where they had this project migrating every Excel spreadsheet to a PHP program.  VBA was heavily used there, and they had entire programs running into that.  What they didn't tell us was that it was cheaper for them to have a whole team of PHP developers doing an internal system than to have the features built into their ERP.  For “security” reasons no business logic could be inside the PHP code, so I had to do tons of Stored Procedures. They also had integrations with MS SQL Server.  The workflow system used it together with a PHP tool called [Scriptcase](www.scriptcase.net).

Another job I had was with a different multinational, I had to do a program to read from various sources and store in a DB for later reports and all.  It would be a “scratch” of an [ETL](https://en.wikipedia.org/wiki/Extract,_transform,_load) (Extract, Transform, Load), but at the time I wasn’t yet well versed with data warehouse techniques. For that job I used PostgreSQL. In the same company we later on did [Magento](http://www.magento.org) white label stores for our clients (other big companies), and it had to have integration with our ERP (unlike my first job). This integration was through a Service Bus written in Java and the ERP had Oracle as the DB.

One of my employers noticed my interest in database tasks, and how quickly I became familiarised with the schema and our data architecture. Our main relational database had millions and millions of records, terabytes and they created a Data Team to make it more efficient. We would create workers to sync data into Elasticsearch for instance. I was still a PHP Developer officially, but mainly curating the DB and doing workers with NodeJS (we needed the async and the indexing time was crucial for business).

I could go on and on through every job I've had.  Most of my jobs have been at big corporations, and that has put me into contact with many flavours of Relational Databases and NoSQL too (MongoDB, Dynamo and Cassandra being the main ones).

In the end, this kind of exposure has made me the “DB” person among my fellow engineers, and everything considered more than a [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) tends to fall in my lap, and I'm happy with that.

That’s how I discovered that I wanted to work with data.  I didn’t have any idea of what kind of title that would be, but I knew I didn’t want to be a DBA, since much of the infrastructure tasks involved in it didn’t sound fun to me. Once the opportunity to work officially as a Data Engineer appeared, I grabbed it with both hands and I _knew_ it was right.
