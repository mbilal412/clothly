import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import userModel from '../models/user.model.js';

const throwError = (message, code = 400) => {
    const err = new Error(message);
    err.stack = new Error().stack; // Capture the stack trace at the point of error creation
    err.statusCode = code;

    throw err;
}

export const authenticateSeller = async (req, res, next) => {

    const token = req.cookies?.token;

    if (!token) {
        throwError('Unauthorized', 401);
    }

    try {
        const decoded = await jwt.verify(token, config.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            throwError('User not found', 404);
        }

        if (user.role !== 'seller') {
            throwError('Forbidden: Sellers only', 403);
        }

        req.user = user;
        next();

    } catch (error) {
        throwError(error.message, error.statusCode || 500);
    }
}

export const authenticateUser = async (req, res, next) => {

    const token = req.cookies?.token;

    if (!token) {
        throwError('Unauthorized', 401);
    }

    try {
        const decoded = await jwt.verify(token, config.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            throwError('User not found', 404);
        }

        req.user = user;
        next();

    } catch (error) {
        throwError(error.message, error.statusCode || 500);
    }
}