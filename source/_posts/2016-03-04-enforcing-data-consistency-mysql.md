---
title: Enforcing data consistency on MySQL
draft: true
date: "2016-03-04"
author: gabriela
categories:
- Article
tags:
- mysql
- strict mode
- mysql 5.7
use:
- posts_tags
- posts_categories
---

Most of the time when we start to develop an application what we worry in the database design is: should I use a composite key? What are the relationships? Is this field nullable? - tip: avoid `NULL`.

The server configuration almost always is taken for granted, we don't know if `STRICT_TRANS_TABLES` is enabled for instance.

The version of MySQL used on this post is the 5.7.11. As of standard it comes with the following modes enabled:

```sql
SELECT @@GLOBAL.sql_mode;
```

Output:

```
ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```

 You can check each one in detail in the [MySQL documentation](http://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_only_full_group_by).
