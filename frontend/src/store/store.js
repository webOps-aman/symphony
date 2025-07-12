import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import settingsReducer from './settingsSlice';


export const store = configureStore({
    reducer: {

        products: productReducer,
        settings: settingsReducer,

    }
})