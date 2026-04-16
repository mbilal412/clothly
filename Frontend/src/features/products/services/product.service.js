import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

export const createProductService = async (productData) => {
    const response = await api.post('/api/products/create-product', productData)
    return response.data
}

