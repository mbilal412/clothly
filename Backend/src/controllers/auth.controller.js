import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import { config } from '../config/config.js';

const generateToken = (user, res, message) => {
    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET, {
        expiresIn: '7d'
    })
    
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
        message,
        success: true,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            contact: user.contact,
            role: user.role
        }
    })
}

const throwError = (message, code=400) => {
    const err = new Error(message);
    err.statusCode = code;
    throw err;
}

export const register = async (req, res) => {
    const { fullName, email, contact, password, isSeller } = req.body;

    const alreadyExists = await userModel.findOne({ email });

    if (alreadyExists) {
        throwError('Email already exists', 409);
    }

    const user = await userModel.create({
        fullName,
        email,
        contact,
        password,
        role: isSeller ? 'seller' : 'buyer'
    })

    generateToken(user, res, 'User registered successfully');
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        throwError('Invalid credentials', 401);
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch) {
        throwError('Invalid credentials', 401);
    }

    generateToken(user, res, 'User logged in successfully');

}