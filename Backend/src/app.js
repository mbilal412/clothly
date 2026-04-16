import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from './config/config.js';
import authRouter from './rotues/auth.route.js';
import productRouter from './rotues/product.route.js';
import errorHandler from './middlewares/error.middleware.js';
import passport from 'passport';
import { Strategy as googleStrategy } from 'passport-google-oauth20';


const app = express();


passport.use(new googleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: `${config.BASE_URL}/api/auth/google/callback`
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));
    
app.use(express.json())
app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true
}))
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);

app.use(errorHandler);

export default app;