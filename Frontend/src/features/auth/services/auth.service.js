import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export const register = async ({name, email, password, contact, role}) => {
    const response = await api.post('/auth/register', {
        name,
        email,
        password,
        contact,
        role
    })
    return response.data
}

