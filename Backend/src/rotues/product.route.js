import express from 'express';
import {authenticateSeller} from '../middlewares/auth.middleware.js';
import { createProductController, getProductsController } from '../controllers/product.controller.js';

import multer from 'multer';

const upload = multer({
    limits: {
        storage: multer.memoryStorage(),
        fileSize: 5 * 1024 * 1024 // 5MB limit

    },
});


const productRouter = express.Router();


// Define product routes here       

productRouter.post('/create-product', upload.array('images', 7), authenticateSeller, createProductController)
productRouter.get('/get-products', authenticateSeller, getProductsController)

export default productRouter;