# Node.js MongoDB Stripe API

## Description
This repository contains a Node.js application for building an API with MongoDB Atlas integration for user registration, authentication, and user record updates. Additionally, it implements Stripe webhook functionality for handling payment events and updating user status accordingly.

## Features
- User registration endpoint
- User authentication with JWT token generation
- User record update endpoint
- Stripe webhook integration for payment event handling

## Prerequisites
Before running this application, make sure you have the following installed:
- Node.js (v12 or higher)
- MongoDB Atlas account
- Stripe account

## Setup
1. **Clone the repository:**
    ```
    git clone https://github.com/Beloved1310/user-auth-payment-api
    ```

2. **Install dependencies:**
    ```
    cd user-auth-payment-api
    npm install
    ```

3. **Configure environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```
    PORT=4000
    MONGODBUR=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    REFRESH_JWT=your_jwt_refresh_token 
    STRIPE_SECRET_KEY=your_stripe_secret_key
    STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
    ```

4. **Run the application:**
    ```
    npm start
    ```

## Endpoints
### Register User
- **URL:** `/register`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
      "firstName": "example_user",
      "lastName": "example_user",
      "email": "your_example_email",
      "password": "example_password",
      "confirm_password": "your_example_confirm_password"
    }
    ```
- **Response:** 201 Created
    ```json
    {
      "message": "User registered successfully"
    }
    ```

### User Login
- **URL:** `/login`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
      "email": "example_email",
      "password": "example_password"
    }
    ```
- **Response:**
    ```json
    {
      "message": "Login Successful", 
      "data": {
        "accessToken": "your_generated_access_token"
      }
    }
    ```

### Update User Record
- **URL:** `/user/:id`
- **Method:** `PUT`
- **Request Body:**
    ```json
    {
      "status": "paid"
    }
    ```
- **Response:** 200 OK
    ```json
    {
      "message": "User record updated successfully",
      "data": {
        "status": "paid"
      }
    }
    ```

### Stripe Webhook
- **URL:** `/webhook`
- **Method:** `POST`

## Contributing
Contributions are welcome! Feel free to open issues or pull requests for any improvements or features you'd like to add.

