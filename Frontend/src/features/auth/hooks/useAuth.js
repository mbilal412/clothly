import { register, login } from "../services/auth.service";
import { useDispatch } from "react-redux";
import {setUser, setLoading, setError} from "../state/auth.slice";

export const useAuth = () => {
    const dispatch = useDispatch();

    const handleRegister = async (userData) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try{
            const data = await register(userData);
            dispatch(setUser(data.user));
        }catch(err) {
            dispatch(setError(err.response?.data || 'Registration failed'));
        }finally{
        dispatch(setLoading(false));
        }
    }

    const handleLogin = async (credentials) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try{
            const data = await login(credentials);
            dispatch(setUser(data.user));
        }catch(err) {
            dispatch(setError(err.response?.data || 'Login failed'));
        }finally{
            dispatch(setLoading(false));
        }
    }

    return{
        handleRegister,
        handleLogin
    }
}