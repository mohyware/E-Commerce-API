# E-Commerce-APIs
## Overview
Developed a RESTful API for an e-commerce platform, It features JWT Authentication for user management, enabling sign-up, login, and profile access. The API supports CRUD operations for products, categories, and user accounts while offering functionalities for product browsing and shopping cart management. Additionally, it allows users to leave reviews on products.
### Completed Features
- **JWT Authentication:** Secure user interactions and data access using JSON Web Tokens to ensure that multiple users can authenticate and interact with the system seamlessly.
- **CRUD Operations:** Implement simple Create, Read, Update, and Delete operations for managing products, categories, and user accounts.
- **Complex Data Model:** Support a comprehensive data model that accommodates products, shopping carts, user accounts, and reviews.
- **User Account Management:** Enable users to sign up for an account and log in to access their profiles and purchase history.
- **Product Browsing and Search:** Provide users the ability to view and search for products within the platform.
- **Shopping Cart Functionality:** Allow users to add products to their cart, remove products, and manage their cart items easily.
- **Admin Panel:** Developed an admin interface for managing inventory, setting prices, and adding new products.
- **Well-Documented Swagger Documentation:** Provides comprehensive API documentation for easy usage.
### Upcoming Features
- Frontend integration for functionality
- User checkout and payment processing with Stripe
- Implementation of Redis for caching to enhance performance

# Project Setup

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

## Installation Steps

1. **Clone the Repository**
   ```bash
   git clone
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Create a .env File and Configure Environment Variables**
   ```bash
    PORT=3000
    JWT_SECRET=YOUR_JWT_SECRET
    JWT_LIFETIME=60d
    DB_NAME=YOUR_DB_NAME
    DB_USER=YOUR_DB_USER
    DB_PASSWORD=YOUR_DB_PASSWORD
    DB_HOST=localhost
    DB_DIALECT=postgres 
   ```
4. **Run this command**
### Just Start
```bash
npm run start
```     
### Development Mode
```bash
npm run dev
```
## Usage
* Access the API at http://localhost:4000/api/v1 using postman.
* Or you can just use the Swagger documentation.
# API Endpoints
## Base URL
`/api/v1`

**Base Route:** `/admin`

| Method | Endpoint               | Description                          | Middleware                   |
|--------|------------------------|--------------------------------------|------------------------------|
| POST   | `/`                    | Create a new admin                  | `authenticateUser`, `adminAuth` |
| GET    | `/`                    | Get all customers                   | `authenticateUser`, `adminAuth` |
| GET    | `/admins`              | Get all admins                      | `authenticateUser`, `adminAuth` |
| GET    | `/:userId`            | Get user by ID                      | `authenticateUser`, `adminAuth` |
| PATCH  | `/:userId`            | Update user by ID                   | `authenticateUser`, `adminAuth` |
| DELETE | `/:userId`            | Delete user by ID                   | `authenticateUser`, `adminAuth` |

### Cart Routes
**Base Route:** `/cart`

| Method | Endpoint               | Description                          | Middleware                   |
|--------|------------------------|--------------------------------------|------------------------------|
| POST   | `/`                    | Add an item to the cart             | `authenticateUser`          |
| GET    | `/`                    | Get user's cart                     | `authenticateUser`          |
| PATCH  | `/:itemId`            | Update item in the cart             | `authenticateUser`          |
| DELETE | `/:itemId`            | Remove item from the cart           | `authenticateUser`          |

### Review Routes
**Base Route:** `/review`

| Method | Endpoint                  | Description                          | Middleware                   |
|--------|---------------------------|--------------------------------------|------------------------------|
| POST   | `/`                       | Create a new review                 | `authenticateUser`          |
| GET    | `/mine/`                  | Get logged in user reviews                   | `authenticateUser`          |
| GET    | `/product/:productId`     | Get reviews for a specific product   | `authenticateUser`          |
| GET    | `/:reviewId`                   | Get review by ID                     | `authenticateUser`          |
| PATCH  | `/:reviewId`                   | Update review by ID                  | `authenticateUser`          |
| DELETE | `/:reviewId`                   | Delete review by ID                  | `authenticateUser`          |

### Product Routes
**Base Route:** `/product`

| Method | Endpoint                  | Description                          | Middleware                   |
|--------|---------------------------|--------------------------------------|------------------------------|
| POST   | `/`                       | Create a new product (Admin only)   | `authenticateUser`, `adminAuth` |
| GET    | `/`                       | Get all products                     |                              |
| GET    | `/:productId`            | Get product by ID                    |                              |
| PATCH  | `/:productId`            | Update product by ID (Admin only)   | `authenticateUser`, `adminAuth` |
| DELETE | `/:productId`            | Delete product by ID (Admin only)   | `authenticateUser`, `adminAuth` |

### Category Routes
**Base Route:** `/category`

| Method | Endpoint                  | Description                          | Middleware                   |
|--------|---------------------------|--------------------------------------|------------------------------|
| POST   | `/`                       | Create a new category (Admin only)  | `authenticateUser`, `adminAuth` |
| GET    | `/`                       | Get all categories                   |                              |
| GET    | `/:categoryId`           | Get category by ID                   |                              |
| PATCH  | `/:categoryId`           | Update category by ID (Admin only)  | `authenticateUser`, `adminAuth` |
| DELETE | `/:categoryId`           | Delete category by ID (Admin only)  | `authenticateUser`, `adminAuth` |

### User Routes
**Base Route:** `/user`

| Method | Endpoint                  | Description                          | Middleware                   |
|--------|---------------------------|--------------------------------------|------------------------------|
| POST   | `/register`               | Register a new user                  |                              |
| POST   | `/login`                  | Log in a user                        |                              |
| POST   | `/logout`                 | Log out a user                       | `authenticateJWT`           |
| GET    | `/`                       | Get logged in user information                 | `authenticateJWT`           |
| PATCH  | `/`                       | Update logged in user information              | `authenticateJWT`           |
| DELETE | `/`                       | Delete logged in user                          | `authenticateJWT`           |

## Project Url
https://roadmap.sh/projects/ecommerce-api
