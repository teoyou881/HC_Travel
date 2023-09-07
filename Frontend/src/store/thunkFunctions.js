import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./../utills/axios";
import ProductInfo from "./../pages/DetailProductPage/Sections/ProductInfo";

export const registerUser = createAsyncThunk("user/registerUser", async (body, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/users/register`, body);

        //return to action.payload
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

export const loginUser = createAsyncThunk("user/loginUser", async (body, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/users/login`, body);
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

export const authUser = createAsyncThunk("user/authUser", async (refreshToken, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/users/auth`, refreshToken);

        // console.log("thunkFunction auhUser ==>  ", response);
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

export const logoutUser = createAsyncThunk("user/logoutUser", async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/users/logout`);
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

export const addToCart = createAsyncThunk("user/addToCart", async (body, thunkAPI) => {
    try {
        // console.log("before axios");
        const response = await axiosInstance.post(`/users/cart`, body);
        // console.log("after axios");
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

export const getCartItems = createAsyncThunk(
    "user/getCartItems",
    async ({ cartItemIds, userCart }, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/products/${cartItemIds}?type=array`);

            // console.log(response);
            // In response.data, there is no quantity.
            // So, we save quantity got from userCart to response.data
            userCart.forEach((cartItem) => {
                response.data.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[index].quantity = cartItem.quantity;
                    }
                });
            });

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const removeCartItem = createAsyncThunk(
    "user/removeCartItem",
    async (productId, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(`/users/cart?productId=${productId}`);
            response.data.cart.forEach((cartItem) => {
                response.data.productInfo.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data.productInfo[index].quantity = cartItem.quantity;
                    }
                });
            });

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const payProducts = createAsyncThunk("user/payProducts", async (body, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/users/payment`, body);
        response.data.cart.forEach((cartItem) => {
            response.data.productInfo.forEach((productDetail, index) => {
                if (cartItem.id === productDetail._id) {
                    response.data.productInfo[index].quantity = cartItem.quantity;
                }
            });
        });

        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});
