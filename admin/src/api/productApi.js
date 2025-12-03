import axiosInstance from "./apiConfig";

export const addProduct = async (formData) => {
    try {
        const response = await axiosInstance.post('/product/addproduct', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


// Get All Products API
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/product/listproduct');
    console.log(response)
    return response.data;
    
  } catch (error) {
    throw error;
  }
};

// Delete Product API
export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/product/removeproduct/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// // Get Single Product API
// export const getProductById = async (productId) => {
//   try {
//     const response = await axiosInstance.get(`/product/${productId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // Update Product API
// export const updateProduct = async (productId, formData) => {
//   try {
//     const response = await axiosInstance.put(`/product/update/${productId}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

