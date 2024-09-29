# To Do List API
## Overview
This project aims to create a robust and efficient RESTful API for managing to-do lists. It provides users with the ability to create, read, update, and delete tasks, as well as manage their user accounts.
## Key Features:
- User authentication: Secure user registration and login mechanisms using JSON Web Tokens (JWT).
- Task management: Create, read, update, and delete tasks.
- Data storage: Store user and task data in a MongoDB database.
- Error handling: Provide informative error messages and handle exceptions gracefully.
- Security: Implement measures to protect the API and user data.
- Swagger integration: Use Swagger to provide comprehensive API documentation, making it easy for developers to understand and interact with the API.
# How to run this project
1. Clone this repository
2. Run `npm install`
3. Create a `.env` file and add the following:
```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret   
JWT_LIFETIME=60d
```
4. Run `node app`
5. Test the API using Postman or any API testing tool

## API Endpoints
### Auth
- POST /api/user/register
- POST /api/user/login

### Todos
- POST /api/todo
- PUT /api/todo/:id
- DELETE /api/todo/:id
- GET /api/todo

https://roadmap.sh/projects/todo-list-api