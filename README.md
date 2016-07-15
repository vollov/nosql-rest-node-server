# nosql-rest-node-server
node restful server with mongodb

technology stack
express 4.x
mongoose



This server load a user table from mongodb and implements CRUD.

## setup env
npm install

## install mongodb data
cd docs
C:\git\nosql-rest-node-server\docs>mongo
2016-01-12T13:08:13.486-0500 I CONTROL  [main] Hotfix KB2731284 or later update is not installed, will zero-out data fil
es
MongoDB shell version: 3.2.1
connecting to: test
> use demo
> load("schema.js")
true
> db.user.find()
{ "_id" : ObjectId("569541d62da78d18f308b623"), "password" : "passwd", "is_active" : false, "email" : "mary@demo.org", "
role" : 1 }
{ "_id" : ObjectId("569541d62da78d18f308b624"), "password" : "foobar", "is_active" : true, "email" : "wendy@abc.com", "r
ole" : 2 }
{ "_id" : ObjectId("569541d62da78d18f308b625"), "password" : "passwd", "is_active" : false, "email" : "dustin@demo.org",
 "role" : 3 }

