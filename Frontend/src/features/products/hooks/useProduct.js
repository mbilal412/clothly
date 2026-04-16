import { createProductService } from "../services/product.service";


export const useProduct = () => {
    const handleCreateProduct = async (productData) => {
        try {
            const response = await createProductService(productData)
            return response.product
        } catch (error) {
            throw error.response?.data || {
                message: 'Error creating product'
            }
        }
    }

    return {
        handleCreateProduct
    }
}