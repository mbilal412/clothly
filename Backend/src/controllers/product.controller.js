import productModel from "../models/products.model.js";
import { uploadImage } from "../services/storage.service.js";

export const createProductController = async (req, res) => {
    const { title, description, price } = req.body;
    const seller = req.user;

    const images = await Promise.all(req.files.map(async (file) => {
        const upload = await uploadImage({
            buffer: file.buffer,
            fileName: file.originalname
        })
        return {
            url: upload.url
        }
    }))

    const product = await productModel.create({
        title,
        description,
        price,
        seller: seller.id,
        images
    })

    res.status(201).json({
        message: 'Product created successfully',
        success: true,
        product
    })
}

export const getProductsController = async (req, res) => {
    const seller = req.user;

    const products = await productModel.find({ seller: seller.id });

    res.status(200).json({
        message: 'Products fetched successfully',
        success: true,
        products
    })
}

export const getAllProductsController = async (req, res) => {
    const products = await productModel.find();

    res.status(200).json({
        message: 'Products fetched successfully',
        success: true,
        products
    })
}