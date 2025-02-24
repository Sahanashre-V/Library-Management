# Library-Management

## Technologies Used

* Docker - For containerization and easy deployment.

* Prisma - ORM for database interaction.

* PostgreSQL - Database for storing library records.

* React - Frontend framework for building the user interface.

## Getting Started

## Backend Setup

 * Run the container:


### Linux/mac
    docker run -d -p 7070:7070 --platform linux/amd64 sahanashre/my-node-app

### Windows
    docker run -d -p 7070:7070 sahanashre/my-node-app



## Frontend Setup

* Run the frontend container:

### Linux/mac
    docker run -d -p 8080:80 --platform linux/amd64 sahanashre/my-vite-app

### Windows
    docker run -d -p 8080:80 sahanashre/my-vite-app

## Features

* User authentication and authorization.

* Book catalog management.

* Borrowing and returning books.

* User-friendly UI with React.

* API interactions with Prisma and PostgreSQL.

* Fully containerized for seamless deployment.

## Developed by Sahanashre 🚀

