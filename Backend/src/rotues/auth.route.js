import { register, login } from "../controllers/auth.controller.js";
import express from 'express';
import { loginValidation, registerValidation } from "../validators/auth.validator.js";


const authRouter = express.Router();

authRouter.post('/register', registerValidation, register);
authRouter.post('/login', loginValidation, login);

export default authRouter;