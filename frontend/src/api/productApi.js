import axiosInstance from "./apiConfig";

// Get All Products API
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/product/listproduct');
    console.log(response)
    return response.data.data;
    
  } catch (error) {
    throw error;
  }
};


// Get Single Product API
export const getProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(`/product/${productId}`);
    return response.data.data;  // ONLY THIS IS NEEDED
  } catch (error) {
    throw error;
  }
};