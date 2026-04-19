import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        loading: true,
        error: null,
    },
    reducers: {
        clearProducts: (state) => {
            state.products = []
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setProducts, setLoading, setError, clearProducts } = productSlice.actions;
export default productSlice.reducer;