import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, authUser, logoutUser, addToCart } from "./thunkFunctions";
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
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                // console.log("userSlice loginUser.fulfilled ==> ", action.payload);
                state.isLoading = false;
                state.userData = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.isAuth = true;
                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem("refreshToken", action.payload.user.refreshToken);

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
                // console.log("userSlice authUser.fulfilled ==> ", action.payload);
                state.isLoading = false;
                state.userData = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.isAuth = true;
                localStorage.setItem("accessToken", action.payload.accessToken);
            })
            .addCase(authUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuth = false;
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                toast.error(action.payload);
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = initialState.userData;
                state.isAuth = false;
                state.accessToken = "";
                localStorage.removeItem("accessToken");
                localStorage.removeItem("accessToken");
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuth = false;
                toast.error(action.payload);
            })
            .addCase(addToCart.pending, (state) => {
                console.log("pending");
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                console.log("fulfilled");
                state.isLoading = false;
                state.userData.cart = action.payload;
                toast.info("product is added to cart");
            })
            .addCase(addToCart.rejected, (state, action) => {
                console.log("recjeted");
                state.isLoading = false;
                state.error = action.payload;
                state.isAuth = false;
                toast.error(action.payload);
            });
    },
});

export default userSlice.reducer;
