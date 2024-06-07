Blog Post Project
Introduction

This project is a full-stack blog post application where users can view, add, edit, and delete blog posts. It also includes user authentication with login, logout, and token refresh functionality using JWT tokens stored in a Redux store. The backend is built with Go, utilizing PostgreSQL and GORM, and the frontend is built with React.js and Axios for API calls. There are two separate backends: one for blog operations and another for user authentication, both sharing the same database.
Features

    User Authentication:
        Login and logout
        JWT token generation and refresh
    Blog Operations:
        View blog posts
        Add new blog posts
        Edit existing blog posts
        Delete blog posts

Technologies Used
Backend

    Go
        Go Fiber for the web framework
        GORM for ORM
        JWT for token authentication
    PostgreSQL for the database

Frontend

    React.js for the user interface
    Redux for state management
    Axios for API calls
