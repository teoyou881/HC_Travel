import { call, takeEvery } from "redux-saga/effects";
import { userActions } from "./userSlice";
import axiosInstance from "../../utills/axios";

const REGISTER_USER_SAGA = "REGISTER_USER_SAGA";

function* regiUserSaga({ email, password, name, image }) {
    const { data } = yield call(axiosInstance.post, "/users/register", {
        email,
        password,
        name,
        image,
    });

    console.log(data.isSuccess);
}

export default function* () {
    yield takeEvery(REGISTER_USER_SAGA, regiUserSaga);
}
