import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./../utills/axios";

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
        console.log("before axios");
        const response = await axiosInstance.post(`/users/cart`, body);
        console.log("after axios");
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});
