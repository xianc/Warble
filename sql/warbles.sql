
-- drop tables
drop table if exists users;
drop table if exists warbles;
drop table if exists followers;

-- create tables


create table users (
	uid integer primary key autoincrement,
	username varchar(50) not null,
	password varchar(8) not null,
	birthday varchar(10)
	);
	
create table warbles (
  id integer primary key autoincrement,
  username varchar(50) not null,
  when date not null,
  message varchar(350) not null
--  attachment varchar (60),
--  warbleAt varchar(50),
  );

create table followers (
	follower varchar(50) not null,
	following varchar(50) not null
	);


-- add data

insert into users values
  (01, 'Xian', 'Chocolate', '07/19/92'),
  (02, 'Eric', 'Smith!', '');
  (03, 'Tim', 'cs326', 'N/A');

insert into warbles values
  (1,'Xian','4/21/13 at 2:15pm','shtarbucks refreshhherrssss nonomnomz'),
  (2,'Xian','4/22/13 at 2:28pm','daaaaaataaabasseeeee'),
  (3,'Eric','4/23/13 at 4:50pm','yolo!'),
  (4,'Xian','4/23/13 at 12:02pm','wanna sshleeeppp alllll dayyyy');

insert into followers values
  ('Xian','Eric'),
  ('Tim', 'Xian'),
  ('Tim', 'Eric');

-- simple select
select * from warbles;

-- select particular attributes:
select username from warbles;
order by id;

-- select with condition
/*select sname, rating, age
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
*/
-- joining tables
--SELECT sid
--FROM Reserves R, Boats B
--WHERE R.bid = B.bid AND B.color = 'red';

-- a basic query with join
--   Find the sailors that have reserved a red boat and are
--   between the ages of 18 and 45 exclusive
/*select s.sname
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
*/
-- Now see the rest in node.js (db.js)