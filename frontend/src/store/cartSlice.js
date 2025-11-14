import { createSlice } from '@reduxjs/toolkit';

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('symphonyCart');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error('Error loading cart from localStorage:', err);
    return [];
  }
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('symphonyCart', serializedCart);
  } catch (err) {
    console.error('Error saving cart to localStorage:', err);
  }
};

// Initial state with cart loaded from localStorage
const initialState = {
  cart: loadCartFromLocalStorage()
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Check if product already exists in the cart
      const existingProduct = state.cart.find(item => item.id === action.payload.id);
      if (existingProduct) {
        // Update the quantity if product already in the cart
        existingProduct.quantity += action.payload.quantity;
      } else {
        // Add new product to the cart
        state.cart.push(action.payload);
      }
      // Save to localStorage after every change
      saveCartToLocalStorage(state.cart);
    },
    
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
      // Save to localStorage after removing
      saveCartToLocalStorage(state.cart);
    },
    
    updateQuantity: (state, action) => {
      const product = state.cart.find(item => item.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
      }
      // Save to localStorage after updating quantity
      saveCartToLocalStorage(state.cart);
    },
    
    clearCart: (state) => {
      state.cart = [];
      // Clear localStorage when cart is cleared
      saveCartToLocalStorage(state.cart);
    },
    
    // Optional: Increment single item quantity
    incrementItem: (state, action) => {
      const product = state.cart.find(item => item.id === action.payload);
      if (product) {
        product.quantity += 1;
        saveCartToLocalStorage(state.cart);
      }
    },
    
    // Optional: Decrement single item quantity
    decrementItem: (state, action) => {
      const product = state.cart.find(item => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        saveCartToLocalStorage(state.cart);
      }
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  incrementItem,
  decrementItem
} = cartSlice.actions;

export default cartSlice.reducer;