import { register } from "../services/auth.service";


export const useAuth = () => {
 

    const handleRegister = async (userData) => {
        const data = await register(userData)
        
    }

    return{
        handleRegister
    }
}