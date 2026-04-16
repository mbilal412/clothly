import { register, login, googleLogin } from "../controllers/auth.controller.js";
import express from 'express';
import { loginValidation, registerValidation } from "../validators/auth.validator.js";
import passport from "passport";


const authRouter = express.Router();

authRouter.post('/register', registerValidation, register);
authRouter.post('/login', loginValidation, login);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', passport.authenticate('google',{session: false, failureRedirect: `${process.env.FRONTEND_URL}/login`}), googleLogin);


export default authRouter;