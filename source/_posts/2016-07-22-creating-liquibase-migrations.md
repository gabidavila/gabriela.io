---
title: Creating Migrations with Liquibase
draft: false
date: '2016-07-22'
author: gabriela
categories:
  - Article
tags:
  - Data Engineering
  - Liquibase
  - Migrations
  - Doctrine
  - Laravel
use:
  - posts_tags
  - posts_categories
---

# Liquibase

[Liquibase](www.liquibase.org) is a versioning tool for databases. Currently is in the 3.5 version and it is installed as a JAR. It has been in the market since 2006, and recently completed its 10th anniversary. In it's feature list we have:

- Code branching and merging
- Multiple database types
- Supports XML, YAML, JSON and SQL formats
- Supports context-dependent logic
- Generate Database change documentation
- Generate Database "diffs"
- Run through your build process, embedded in your application or on demand
- Automatically generate SQL scripts for DBA code review
- Does not require a live database connection

## Why you need it?

Some frameworks comes with built-in solutions out of the box like [Eloquent](https://laravel.com/docs/5.2/eloquent) and [Doctrine](http://www.doctrine-project.org/). There is nothing wrong in using that when you have only DB per project, but when you have multiple systems, it starts to get complicated.

Since Liquibase works as a versioning tool, you can branch like a normal code on github and merge as needed. You have contexts, which means changes can be applied to specific environments only and tagging capabilities to be able to rollback.

Rollback is a tricky thing, you can either do an automatically rollback or define a script, useful when deal with MySQL for instance where **DDL** changes are **NOT** transactional.

## Guidelines for changelogs and migrations

- **MUST** be written using the `JSON` format. Exceptions are `changes/legacy/base.xml` and `changes/legacy/base_procedures_triggers.sql`.
- **MUST NOT** be edited. If a new column is to be added, a **new** migration file must be created and the file **MUST** be added **AFTER** the las run transaction.

## Branching

There could be 3 main branches:

- `production` (master)
- `staging`
- `testing`

Steps:

1. Create your changelog branch;
2. Merge into `testing`;
3. When the feature ready to staging, merge into `staging`;
4. When the feature is ready, merge into `production`.

Example:

![Liquibase](img/2016/07/LIQUIBASE.png)

Rules:

- `testing`, `staging` and `production` **DO NOT** merge amongst themselves in any capacity;
- **DO NOT** rebase the main branches;
- Custom branch **MUST** be deleted after merged into `production`.

The downside of this approach is the diverging state between the branches. Current process is to from time to time compare the branches and manually check the diffs for unplanned discrepancies.

## Procedures for converting a legacy database to Liquibase migrations

Some projects are complete monoliths. More than one application connects to it, and this is not a good practice, if you do that I recommend you treating the database sourcing as in its own repository and not together with your application.

## Writing migrations

This is a way I found for keeping the structure in reasonable sense. Suggestions are welcome.

## 1\. Create the property file

Should be in the root of the project and be named `liquibase.properties`:

```
driver: com.mysql.jdbc.Driver
classpath: /usr/share/java/mysql-connector-java.jar:/usr/share/java/snakeyaml.jar
url: jdbc:mysql://localhost:3306/mydb
username: root
password: 123
```

The `JAR` files in the classpath can be manually downloaded or installed though the server package manager.

## Create the Migration file

You can choos e between different formats, I chose to use JSON, in this instance I will be running this SQL:

<script src="https://gist.github.com/gabidavila/47cfc3e6165dbeb0782e639e21a9399a.js">
</script>

Which will translate to this:

<script src="https://gist.github.com/gabidavila/852ac1adcefc6f49060fc329dfe2b2c3.js">
</script>

It is verbose? Yes, completely, but then you have a tool to show you what the SQL will look like and be able to manage the rollbacks.

Save the file as:

```
.
  /changes
    - changelog.json
    - create_mydb_users.json
```

Where changelog.json looks like this:

<script src="https://gist.github.com/gabidavila/7d670f761aef47491d294c4a8a00de79.js">
</script>

For each new change you add it to the end of the `databaseChangeLog` array.

## Run it

To run, just simply do:

```sh
$ liquibase --changeLogFile=changes/changelog.json migrate
```

Don't worry if you run it twice, the change only happens once.

Next post is how to add a legacy DB into Liquibase.

To learn how to go deeper into Liquibase formats and documentation, access [this link](http://www.liquibase.org/documentation/).
