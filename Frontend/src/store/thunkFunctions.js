import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./../utills/axios";

export const registerUser = createAsyncThunk("user/registerUser", async (body, thunkAPI) => {
    console.log("registerUser in thunk.js");
    try {
        const response = await axiosInstance.post(`/users/register`, body);
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});
