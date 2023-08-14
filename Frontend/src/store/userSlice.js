import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, authUser } from "./thunkFunctions";
import { toast } from "react-toastify";
import localStorage from "redux-persist/es/storage";

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
                toast.success("success to create an account");
            })
            .addCase(registerUser.rejected, (state, action) => {
                // console.log(action.payload);
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
                state.isAuth = true;
                localStorage.setItem("accessToken", action.payload.accessToken);

                //toast.success("success to login");
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(authUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
                state.isAuth = true;
            })
            .addCase(authUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuth = false;
                localStorage.removeItem("accessToken");
                toast.error(action.payload);
            });
    },
});

export default userSlice.reducer;
