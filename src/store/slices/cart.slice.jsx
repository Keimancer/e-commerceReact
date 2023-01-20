import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCartProducts: ( state, action ) => {
            const products = action.payload;
            return products;
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
        .then( res => dispatch( setCartProducts(res.data.data.cart.products) ))
        .finally(() => dispatch(setIsLoading(false)));
}


export const addProductThunk = ( product ) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://e-commerce-api.academlo.tech/api/v1/cart", product, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const purchaseCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://e-commerce-api.academlo.tech/api/v1/purchases", {}, getConfig())
        .then(() => dispatch(setCartProducts([])))
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteProduct = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${ id }`, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setCartProducts } = cartSlice.actions;

export default cartSlice.reducer;
