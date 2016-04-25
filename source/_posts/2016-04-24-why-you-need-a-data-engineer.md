---
title: Why you need a Data Engineer
draft: false
date: "2016-04-24"
author: gabriela
categories:
- Article
tags:
- Data Engineer
- Data Scientist
- Data Analyst
- DBA
use:
- posts_tags
- posts_categories
---

<p style="align:center"><img src="http://i.stack.imgur.com/yZQgZ.gif" alt="Dilbert" class="img-thumbnail"></p>

Tech evolves quickly. When the buzzword Big Data started showing up more and more, the market was in need of people able to analyse and give meaning to what was collected. For instance, an article published in 2012 by Harvard Business Review was entitled: [Data Scientist: The Sexiest Job of the 21st Century](https://hbr.org/2012/10/data-scientist-the-sexiest-job-of-the-21st-century/).

Today we have **DBA**, **Data Scientist**, **Data Engineer**, **Data Analyst**, a wealth of options with the "Data" as prefix. More often than not, people put everyone in the same basket and assume everyone knows and has the same set of skills.

From _my_ point of view and perspective as a _Data Engineer_, these are the differences:

* **DBA** - Once the person I hated the most in any team. Seriously, why doesn't that human give me the necessary permissions on the database? If I had access, I would have done my job sooner... Well, that was my thought as a Software Engineer at the time. Turns out, DBAs are, what my friends and I used to call, the database babysitter. You need to tune and figure out why performance is not as it should be? Need help with a complicated query? That's the go-to person for it. But notice, this is [RDBMS](https://en.wikipedia.org/wiki/Relational_database_management_system) specific and heavily focused on the operational part.

* **Data Scientist** - The market usually wants a professional with a PhD in statistics or an otherwise heavily math-oriented person. This person will be responsible for creating prediction models based on current data. Do you know how Amazon knows what you should buy next based on your browsing history? Yeah, this individual probably did the programming around that, has machine learning down to a T, and needs to possess Product, Engineering and Statistics knowledge.

* **Data Analyst** - This person also deals with a bit of statistics, but more in the business sense, dealing with and creating reports for Business Intelligence. This role tries to answer business questions; identifying where data acquisition/quality is failing, for example.

**Data Engineer** - This role I can explain with more passion: it is what I do, so this probably _will_ be biased. We are the **_bridge_**. We help Software Engineers to build the application for storage and retrieval in a manner which provides the Data Scientists and Data Analysts with the information they need to do their job.

## So why do you need a Data Engineer on your team?

We do [ETL (Extract-Transform-Load)](https://en.wikipedia.org/wiki/Extract,_transform,_load). We put data **in** the Data Warehouse, it’s from there that **Data Analysts** and the **Data Scientists** get part of the information they need. We may ended up sending data to Hadoop for instance too. They don’t query into your main relational database or on your MongoDB cluster (not usually),

I’ve seen queries taking hours to run because the main DB is not structured to deliver the information the way they need. That's because when trying to do a new application we think in a normalised database, some of those professions need a [star schema](https://en.wikipedia.org/wiki/Star_schema) as in a Data Warehouse for example, or totally non normalized data if you are optimising searches on Solr.

We devise the best strategy for caching information, design database architecture, NoSQL clusters. Should this JSON return from the Facebook API really be stored in the relational database? (Short answer: no.) Should this query with a `LIKE '%string%'` really be running in the application (no.) and not getting data from Elasticsearch (probably.)?

We work with RDBMS, NoSQL, Search Engines, Cache engines. I particularly make a lot of use of RDBMS since most of my work has been on Legacy applications. As an example, one of our responsibilities is to lower the load on RDBMS for unnecessary stored data presented there.

It is still necessary to know about topics like: indexing, transactions, query profiling and performance tuning.

**_To sum up_: We are the wild card of storage technology.**

Developers don't usually care about the precise details of data. They just want what is fast and easy to use. They think about delivery, not so much about long term data retrieval.

> "I am going to store this access log for my website on that table."

They probably didn't stop to think that that table will potentially have million of records within a span of months. Why not ELK? Cassandra? Those tools allows the information to be fast retrievable with Elasticsearch and easily scalable with Cassandra. That way you don’t overload your main RDBM system with the same query that’s being repeated plenty of times through a `TEXT` field for instance. See also : [Strip your `TEXT` field](http://gabriela.io/blog/2015/04/27/strip-your-text-field/).

## How should you work with a Data Engineer?

You know that feature you want to implement? Talk to us first. You can design the application the way you want, but we give you the insight into the data layer.

Do not isolate us on your team, we need support from your DevOps, we need the engineers to be our partners and to collaborate on problem solving; we are not only be there to run the queries they deem necessary because they don’t have access to the database. If you want to have that wicked fast search by category on your ecommerce, I guarantee you that `LIKE` is not the fast approach, The DevOps will help us setup the environment for the platform to take the best advantage, many developers may foreseen this, but most don’t. Again, we are the _bridge_. This is our job.

You can have another view of this on this blogpost: [The different data science roles in the industry](http://www.kdnuggets.com/2015/11/different-data-science-roles-industry.html)..