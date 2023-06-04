DROP DATABASE IF EXISTS db_task;
CREATE DATABASE db_task;


USE db_task;

DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(255) NOT NULL,
	description TEXT,
	status VARCHAR(20),
	createdate DATETIME,
	modifieddate DATETIME NULL,
	deleted TINYINT(1) DEFAULT 0,
	deleteddate DATETIME NULL,
	INDEX idx_status (status)
);

INSERT INTO tasks (title, description, status, createdate, modifieddate, deleted)
VALUES
  ('Task 1', 	'Description for Task 1',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 2', 	'Description for Task 2',	'ONGOING',		NOW(),	NOW(),	0),
  ('Task 3', 	'Description for Task 3',	'FINISHED',		NOW(),	NOW(),	0),
  ('Task 4', 	'Description for Task 4',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 5', 	'Description for Task 5',	'ONGOING',		NOW(),	NOW(),	0),
  ('Task 6', 	'Description for Task 6',	'FINISHED',		NOW(),	NOW(),	0),
  ('Task 7', 	'Description for Task 7',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 8', 	'Description for Task 8',	'ONGOING',		NOW(),	NOW(),	0),
  ('Task 9', 	'Description for Task 9',	'FINISHED',		NOW(),	NOW(),	0),
  ('Task 10', 	'Description for Task 10',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 11', 	'Description for Task 11',	'ONGOING',		NOW(),	NOW(),	0),
  ('Task 12', 	'Description for Task 12',	'FINISHED',		NOW(),	NOW(),	0),
  ('Task 13', 	'Description for Task 13',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 14', 	'Description for Task 14',	'ONGOING',		NOW(),	NOW(),	0),
  ('Task 15', 	'Description for Task 15',	'FINISHED',		NOW(),	NOW(),	0),
  ('Task 16', 	'Description for Task 16',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 17', 	'Description for Task 17',	'ONGOING',		NOW(),	NOW(),	0),
  ('Task 18', 	'Description for Task 18',	'FINISHED',		NOW(),	NOW(),	0),
  ('Task 19', 	'Description for Task 19',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 20', 	'Description for Task 20',	'ONGOING',		NOW(),	NOW(),	0),
  ('Task 21', 	'Description for Task 21',	'FINISHED',		NOW(),	NOW(),	0),
  ('Task 22', 	'Description for Task 22',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 23', 	'Description for Task 23',	'ONGOING',		NOW(),	NOW(),	0),
  ('Task 24', 	'Description for Task 24',	'FINISHED',		NOW(),	NOW(),	0),
  ('Task 25', 	'Description for Task 19',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 26', 	'Description for Task 20',	'ONGOING',		NOW(),	NOW(),	0),
  ('Task 27', 	'Description for Task 21',	'FINISHED',		NOW(),	NOW(),	0),
  ('Task 28', 	'Description for Task 22',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 29', 	'Description for Task 23',	'ONGOING',		NOW(),	NOW(),	0),
  ('Task 30', 	'Description for Task 24',	'FINISHED',		NOW(),	NOW(),	0),
  ('Task 31', 	'Description for Task 19',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 32', 	'Description for Task 20',	'ONGOING',		NOW(),	NOW(),	0),
  ('Task 33', 	'Description for Task 21',	'FINISHED',		NOW(),	NOW(),	0),
  ('Task 34', 	'Description for Task 22',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 35', 	'Description for Task 23',	'ONGOING',		NOW(),	NOW(),	0),
  ('Task 36', 	'Description for Task 24',	'FINISHED',		NOW(),	NOW(),	0),
  ('Task 37', 	'Description for Task 19',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 38', 	'Description for Task 20',	'ONGOING',		NOW(),	NOW(),	0),
  ('Task 39', 	'Description for Task 21',	'FINISHED',		NOW(),	NOW(),	0),
  ('Task 40', 	'Description for Task 22',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 41', 	'Description for Task 21',	'FINISHED',		NOW(),	NOW(),	0),
  ('Task 42', 	'Description for Task 22',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 43', 	'Description for Task 23',	'ONGOING',		NOW(),	NOW(),	0),
  ('Task 44', 	'Description for Task 24',	'FINISHED',		NOW(),	NOW(),	0),
  ('Task 45', 	'Description for Task 19',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 46', 	'Description for Task 20',	'ONGOING',		NOW(),	NOW(),	0),
  ('Task 47', 	'Description for Task 21',	'FINISHED',		NOW(),	NOW(),	0),
  ('Task 48', 	'Description for Task 22',	'CANCELLED',	NOW(),	NOW(),	0),
  ('Task 49', 	'Description for Task 23',	'ONGOING',		NOW(),	NOW(),	0),
  ('Task 50', 	'Description for Task 24',	'FINISHED',		NOW(),	NOW(),	0)
;