
-- drop tables
drop table if exists sailors;
drop table if exists reserves;
drop table if exists boats;

-- create tables
create table user (
	sid integer primary key autoincrement,
	rating int not null,
	age real not null,
  username varchar(50) not null,
  password varchar(50) not null,
  uid real not null,
  birthday varchar(50) not null,
  this.warbles; //a specific user's warbles
  this.followers
	);

create table reserves (
	sid int not null,
	bid int not null,
	day date not null,
  primary key (sid, bid)
	);

create table boats (
	bid integer primary key autoincrement,
	bname varchar(50) not null,
	color varchar(14) not null
	);

-- add data
insert into sailors values
  (29, 'brutus', 1, 33),
  (85, 'art', 3, 25.5),
  (95, 'bob', 3, 63.5),
  (96, 'frodo', 3, 25.5),
  (22, 'dustin', 7, 45),
  (64, 'horatio', 7, 35),
  (31, 'lubber', 8, 55.5),
  (32, 'andy', 8, 25.5),
  (74, 'horatio', 9, 35),
  (58, 'rusty', 10, 35),
  (71, 'zorba', 10, 16);

insert into reserves values
  (22,101,'2012-09-10'),
  (22,102,'2012-09-10'),
  (22,103,'2012-10-7'),
  (22,104,'2012-10-14'),
  (31,102,'2012-11-12'),
  (31,103,'2012-11-06'),
  (31,104,'2012-11-27'),
  (64,101,'2012-12-01'),
  (64,102,'2012-12-03'),
  (74,103,'2012-12-19');

insert into boats values
  (101,'Interlake','blue'),
  (102,'Interlake','red'),
  (103,'Clipper','green'),
  (104,'Marine','red');

-- simple select
select * from sailors;

-- select particular attributes:
select sname from sailors;

-- select with condition
select sname, rating, age
from sailors
where age > 18;

-- select with pattern
select *
from sailors
where sname like 'b%b';

-- select distinct values
select distinct sname, age from sailors;

-- ordering results
select sname, rating, age
from sailors
where age > 18
order by rating, sname;

-- joining tables
SELECT sid
FROM Reserves R, Boats B
WHERE R.bid = B.bid AND B.color = 'red';

-- a basic query with join
--   Find the sailors that have reserved a red boat and are
--   between the ages of 18 and 45 exclusive
select s.sname
from sailors s, boats b, reserves r
where s.sid=r.sid and b.bid=r.bid
  and b.color='red'
  and s.age>18 and s.age<45;

-- another query with join
--   Find the colors of boats reserved by lubber
select distinct b.color
from sailors s, reserves r, boats b
where s.sid=r.sid
  and r.bid=b.bid
  and s.sname='lubber';

-- renaming columns
select sname as name, age as x
from sailors
where age>21;

-- Now see the rest in node.js (db.js)