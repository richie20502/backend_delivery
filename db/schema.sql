DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	route VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	phone VARCHAR(255) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	password VARCHAR(255) NOT NULL,
	is_avalible BOOLEAN NULL,
	session_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);


insert into users(
	email,
	name,
	lastname,
	phone,
	password,
	created_at,
	updated_at)
Values(
	'richie@richie.com',
	'richie',
	'lugo',
	'1234567897',
	'123456',
	'2023-05-06',
	'2023-05-06'
)





