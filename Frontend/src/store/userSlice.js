import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
    userData: {
        id: "",
        email: "",
        name: "",
        role: 0,
        image: "",
    },
    isAuth: false,
    isLoading: false,
    error: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                toast.info("success to create an account");
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
                state.error = action.payload;
                toast.info(action.payload);
            });
    },
});

export default userSlice.reducer;
