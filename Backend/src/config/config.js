import dotenv from 'dotenv';

dotenv.config();

if (!process.env.FRONTEND_URL) {
    throw new Error('FRONTEND_URL is not defined in the environment variables');
}

if(!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

if(!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}

export const config = {
    MONGO_URI: process.env.MONGO_URI,
    FRONTEND_URL: process.env.FRONTEND_URL,
    JWT_SECRET: process.env.JWT_SECRET
}