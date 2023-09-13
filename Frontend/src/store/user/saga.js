import { call, put, takeEvery } from "redux-saga/effects";
import { actions, Types } from ".";
import axiosInstance from "../../utills/axios";
import { toast } from "react-toastify";
function* regiUserSaga({ email, password, name, image }) {
    yield put(actions.setLoading(true));
    const { data } = yield call(axiosInstance.post, "/users/register", {
        email,
        password,
        name,
        image,
    });
    toast.success("success to create an account");
    yield put(actions.setLoading(true));
    // console.log(data.isSuccess);
}

export default function* () {
    yield takeEvery(Types.REGISTER, regiUserSaga);
}

// .addCase(registerUser.pending, (state) => {
//     state.isLoading = true;
// })
// .addCase(registerUser.fulfilled, (state) => {
//     state.isLoading = false;
//     toast.success("success to create an account");
// })
// .addCase(registerUser.rejected, (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//     toast.error(action.payload);
// })
