import { createSlice } from "@reduxjs/toolkit";
import { products } from "../assets/assets";

const productSlice = createSlice({

    name: 'products',
    initialState: products,
    reducers: {
        // You can add logic to fetch/update products here later
    }

});

export const selectProducts = (state) => state.products;
export default productSlice.reducer;