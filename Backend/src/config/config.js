import dotenv from 'dotenv';

dotenv.config();

if(!process.env.BASE_URL) {
    throw new Error('BASE_URL is not defined in the environment variables');
}

if (!process.env.FRONTEND_URL) {
    throw new Error('FRONTEND_URL is not defined in the environment variables');
}

if(!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

if(!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}

if(!process.env.GOOGLE_CLIENT_ID) {
    throw new Error('GOOGLE_CLIENT_ID is not defined in the environment variables');
}

if(!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error('GOOGLE_CLIENT_SECRET is not defined in the environment variables');
}

export const config = {
    BASE_URL: process.env.BASE_URL,
    MONGO_URI: process.env.MONGO_URI,
    FRONTEND_URL: process.env.FRONTEND_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
}