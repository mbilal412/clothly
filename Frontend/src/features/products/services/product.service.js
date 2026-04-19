import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

export const createProductService = async (productData) => {
    const response = await api.post('/api/products/create-product', productData)
    return response.data
}

export const getProductsService = async () => {
    const response = await api.get('/api/products/get-products')
    return response.data
}

export const getAllProductsService = async () =>{
    const response = await api.get('/api/products/get-all-products')
    return response.data
}