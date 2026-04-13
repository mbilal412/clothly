import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

export const register = async (userData) => {
    const response = await api.post('/api/auth/register', userData)
    return response.data
}

export const login = async (credentials) => {
    const response = await api.post('/api/auth/login', credentials)
    return response.data
}

