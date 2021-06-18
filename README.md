# Groupomania - OpenClassrooms Project 7 - Web Developer course

>This page has been created by **Richard Oven** as a project for OpenClassrooms - Web Developer course.
>Project has been started on 2nd of March - 2021 and has been finalized on 17th of June - 2021
---

**Last project on the path. I've spent a bit more than 3 month on this project - as a beginner developer - to maximize the reusability for the future.**

The project includes different languages, such as "***PostgreSQL*** (database), ***Javascript*** (Standard) (back and front-end coding language), ***VueJS with Bootstrap*** /BootstrapVue/ (front-end framework), ***CSS/SASS*** (front-end styling language).

>It is a Full-Stack Solution.

The purpose of this project is to create an internal social-media web application for a company and its employees - called **Groupomania**.

## Project made of 3 major parts
  
1. ***Relational Database*** (logical connections between stored data):  
The aim is to ***NOT*** to have null entries within the database. To prevent this I've built tables for the majority of user actions - such as **registering a profile, creating a post** - *within that a table for text content (if only that is being shared) and a table for media uploads (if only that is being shared)*, a table **for post views** (to easily identify which other user's post has been read already) and **also a comment table** (going to contain the comments been left on the post).  
These tables are passing relevant information - such as **userId or postId** - to each other, making stable connections between each of them and letting us to re-use any information from them at any stage of development or point of time.

2. ***Back-end*** (bridge between database and Front-end):  It has been built on top of **Node.JS** with **Express**
