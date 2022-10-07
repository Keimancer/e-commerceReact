import { configureStore } from '@reduxjs/toolkit'
import purchasesSlice from './slices/purchases.slice'
import isLoadingSlice from './slices/isLoading.slice'
import productsSlice from './slices/products.slice'
import cartSlice from './slices/cart.slice'
import isLoggedInSlice from './slices/isLoggedIn.slice'

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        products: productsSlice,
        purchases: purchasesSlice,
        cart: cartSlice,
        isLoggedIn: isLoggedInSlice,
    }
})
