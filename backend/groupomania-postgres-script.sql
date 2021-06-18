-- Database: groupomania

-- DROP DATABASE groupomania;

CREATE DATABASE groupomania
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United Kingdom.1252'
    LC_CTYPE = 'English_United Kingdom.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	
-- SCHEMA: ocproject7

-- DROP SCHEMA ocproject7 ;

CREATE SCHEMA ocproject7
    AUTHORIZATION postgres;
	
-- Table: ocproject7.users

-- DROP TABLE ocproject7.users;

CREATE TABLE ocproject7.users
(
    userid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    firstname character varying(100) COLLATE pg_catalog."default",
    lastname character varying(100) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    createdat timestamp(0) with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp(0) with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_users_userid PRIMARY KEY (userid)
)

TABLESPACE pg_default;

ALTER TABLE ocproject7.users
    OWNER to postgres;

-- Table: ocproject7.posts

-- DROP TABLE ocproject7.posts;

CREATE TABLE ocproject7.posts
(
    postid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    userid integer NOT NULL,
    createdat timestamp(0) with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp(0) with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_posts_postid PRIMARY KEY (postid),
    CONSTRAINT fk_posts_users FOREIGN KEY (userid)
        REFERENCES ocproject7.users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE ocproject7.posts
    OWNER to postgres;
	
-- Table: ocproject7.texts

-- DROP TABLE ocproject7.texts;

CREATE TABLE ocproject7.texts
(
    textid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    textcontent character varying COLLATE pg_catalog."default",
    createdat timestamp(0) with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp(0) with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    postid integer NOT NULL,
    CONSTRAINT pk_texts_textid PRIMARY KEY (textid)
)

TABLESPACE pg_default;

ALTER TABLE ocproject7.texts
    OWNER to postgres;
	
-- Table: ocproject7.uploads

-- DROP TABLE ocproject7.uploads;

CREATE TABLE ocproject7.uploads
(
    uploadid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    imagesrc character varying COLLATE pg_catalog."default",
    imagealt character varying COLLATE pg_catalog."default",
    createdat timestamp(0) with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    postid integer NOT NULL,
    updatedat timestamp(0) with time zone NOT NULL,
    CONSTRAINT pk_uploads_uploadid PRIMARY KEY (uploadid)
)

TABLESPACE pg_default;

ALTER TABLE ocproject7.uploads
    OWNER to postgres;
	
-- Table: ocproject7.postlikes

-- DROP TABLE ocproject7.postlikes;

CREATE TABLE ocproject7.postlikes
(
    postlikeid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    postid integer NOT NULL,
    userid integer NOT NULL,
    createdat timestamp(0) with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp(0) with time zone NOT NULL,
    CONSTRAINT postlikes_pkey PRIMARY KEY (postlikeid)
)

TABLESPACE pg_default;

ALTER TABLE ocproject7.postlikes
    OWNER to postgres;
	
-- Table: ocproject7.postview

-- DROP TABLE ocproject7.postview;

CREATE TABLE ocproject7.postview
(
    postviewid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    userid integer NOT NULL,
    postid integer NOT NULL,
    createdat timestamp(0) with time zone NOT NULL,
    updatedat timestamp(0) with time zone NOT NULL,
    CONSTRAINT postview_pkey PRIMARY KEY (postviewid)
)

TABLESPACE pg_default;

ALTER TABLE ocproject7.postview
    OWNER to postgres;
	
-- Table: ocproject7.comments

-- DROP TABLE ocproject7.comments;

CREATE TABLE ocproject7.comments
(
    commentid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    postid integer NOT NULL,
    userid integer NOT NULL,
    comment character varying COLLATE pg_catalog."default",
    createdat timestamp(0) with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp(0) with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_comments_commentid PRIMARY KEY (commentid),
    CONSTRAINT fk_comments_posts FOREIGN KEY (postid)
        REFERENCES ocproject7.posts (postid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_comments_users FOREIGN KEY (userid)
        REFERENCES ocproject7.users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE ocproject7.comments
    OWNER to postgres;