import express from 'express';
import {authenticateSeller, authenticateUser} from '../middlewares/auth.middleware.js';
import { createProductController, getProductsController, getAllProductsController } from '../controllers/product.controller.js';
import { createProductValidation } from '../validators/product.validator.js';

import multer from 'multer';

const upload = multer({
    limits: {
        storage: multer.memoryStorage(),
        fileSize: 5 * 1024 * 1024 // 5MB limit

    },
});


const productRouter = express.Router();


// Define product routes here       

productRouter.post('/create-product', upload.array('images', 7), authenticateSeller, createProductValidation, createProductController)
productRouter.get('/get-products', authenticateSeller, getProductsController)
productRouter.get('/get-all-products', getAllProductsController)

export default productRouter;