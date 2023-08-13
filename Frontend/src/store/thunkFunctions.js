import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./../utills/axios";

export const registerUser = createAsyncThunk("user/registerUser", async (body, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/users/register`, body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});
