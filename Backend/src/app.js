import express from 'express';
import cors from 'cors'
import { config } from './config/config.js';
import authRouter from './rotues/auth.route.js';
import errorHandler from './middlewares/error.middleware.js';


const app = express();

app.use(express.json())
app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true
}))


app.use('/api/auth', authRouter);

app.use(errorHandler);

export default app;