# Auth Server

This project is a backend server built with TypeScript and Express, designed for user authentication and management using MongoDB.

## Features

- User registration and login
- JWT-based authentication
- User profile management
- Input validation for requests

## Technologies Used

- TypeScript
- Express
- MongoDB (via Mongoose)
- JSON Web Tokens (JWT)

## Project Structure

```
auth-server
├── src
│   ├── app.ts                # Entry point of the application
│   ├── controllers           # Contains controllers for handling requests
│   │   ├── authController.ts  # Handles authentication logic
│   │   └── userController.ts  # Handles user management logic
│   ├── middleware            # Contains middleware functions
│   │   ├── auth.ts           # Auth middleware for JWT verification
│   │   └── validation.ts      # Request validation middleware
│   ├── models                # Contains Mongoose models
│   │   └── User.ts           # User model schema
│   ├── routes                # Contains route definitions
│   │   ├── auth.ts           # Authentication routes
│   │   └── users.ts          # User-related routes
│   ├── config                # Configuration files
│   │   └── database.ts       # MongoDB connection setup
│   └── types                 # TypeScript types and interfaces
│       └── index.ts          # Common types used in the application
├── package.json              # NPM dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd auth-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your MongoDB database and update the connection string in `src/config/database.ts`.

4. Start the server:
   ```
   npm run start
   ```

## API Endpoints

### Authentication

- **POST /auth/register**: Register a new user
- **POST /auth/login**: Log in an existing user

### Users

- **GET /users/:id**: Retrieve user profile by ID
- **PUT /users/:id**: Update user information

## License

This project is licensed under the MIT License.