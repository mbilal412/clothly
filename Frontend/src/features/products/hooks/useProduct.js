import { createProductService, getAllProductsService, getProductsService } from "../services/product.service";
import { useDispatch } from "react-redux";
import { setLoading, setProducts, setError, clearProducts } from "../state/product.slice";

export const useProduct = () => {
    const dispatch = useDispatch();

    const handleCreateProduct = async (productData) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const response = await createProductService(productData)
        } catch (error) {
            dispatch(setError(error.response?.data || 'Failed to create product'));
            throw error;
        }finally {
            dispatch(setLoading(false));
        }
    }

    const handleGetProducts = async () => {
        try {
            dispatch(clearProducts())
            dispatch(setLoading(true));
            dispatch(setError(null));
            const response = await getProductsService()
            dispatch(setProducts(response.products))
        } catch (error) {
            throw error;
        }finally {
            dispatch(setLoading(false));
        }
    }

    const handleGetAllProducts = async () => {
        try {
            dispatch(setLoading(true));
            dispatch(clearProducts())
            dispatch(setError(null));
            const response = await getAllProductsService()
            dispatch(setProducts(response.products))
        } catch (error) {
            throw error;
        }finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleCreateProduct,
        handleGetProducts,
        handleGetAllProducts
    }
}