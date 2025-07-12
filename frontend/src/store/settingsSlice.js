import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: '₹',
  delivery_fee: 10
};

const settingsSlice = createSlice({

    name: 'settings',
    initialState,
    reducers: {}

});

export const selectCurrency = (state) => state.settings.currency;
export const selectDeliveryFee = (state) => state.settings.delivery_fee;

export default settingsSlice.reducer;