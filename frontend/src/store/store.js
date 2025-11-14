import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import settingsReducer from './settingsSlice';
import cartReducer from './cartSlice';


export const store = configureStore({
    reducer: {

        products: productReducer,
        settings: settingsReducer,
        cart: cartReducer,

    }
})