import axiosInstance from "./axiosConfig";

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


// // Get All Products API
// export const getAllProducts = async () => {
//   try {
//     const response = await axiosInstance.get('/product/allproducts');
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

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

// // Delete Product API
// export const deleteProduct = async (productId) => {
//   try {
//     const response = await axiosInstance.delete(`/product/delete/${productId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };