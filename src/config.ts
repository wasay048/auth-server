import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5005,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/auth_demo',
  jwtSecret: process.env.JWT_SECRET || 'tahirkhan',
};
