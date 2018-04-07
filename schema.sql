DROP DATABASE IF EXISTS flow_trainer;

CREATE DATABASE flow_trainer; 

\c flow_trainer;

CREATE TABLE arts (
  art_id integer PRIMARY KEY, 
  name varchar(32) UNIQUE NOT NULL
);

CREATE TABLE modes(
  mode_id integer NOT NULL PRIMARY KEY,
  name varchar(32) UNIQUE NOT NULL
);

CREATE TABLE arts_modes(
  art_id integer REFERENCES arts ON DELETE CASCADE,
  mode_id integer REFERENCES modes ON DELETE CASCADE,
  PRIMARY KEY (art_id, mode_id)
);

/* 
startp
psql
\i schema.sql
\c DB_NAME

Load schema and connect to DB
*/
