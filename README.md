Node.js, Express & MySQL: Simple Add, Edit, Delete, View (CRUD)
========

A simple and basic CRUD application (Create, Read, Update, Delete) using Node.js, Express, MySQL & EJS Templating Engine.

**Creating database and table**

```
create database test;

use test;

CREATE TABLE employee (
id int(11) NOT NULL auto_increment,
name varchar(100) NOT NULL,
email varchar(100) NOT NULL,
salary int NOT NULL,
PRIMARY KEY (id)
);
```
