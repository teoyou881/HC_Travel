import { call, put, takeEvery } from "redux-saga/effects";
import { actions, Types } from ".";
import axiosInstance from "../../utills/axios";
import { toast } from "react-toastify";

function* regiUserSaga({ email, password, name, image, navigate }) {
    try {
        yield put(actions.setValue("isLoading", true));
        // yield put(actions.setLoading(false));
        const result = yield call(axiosInstance.post, "/users/register", {
            email,
            password,
            name,
            image,
        });
        yield put(actions.setValue("isLoading", false));
        // yield put(actions.setLoading(false));
        // console.log(result);

        // if (result.data.isSuccess) {
        //     toast.success("success to create an account");
        //     yield navigate("/");
        // }
    } catch (error) {
        /**
         * when backend throw an error, how can I handle it?????
         */

        // console.log(error);
        toast.error(error.message);
        yield put({ type: "user/error", error: error.message });
    }
}

export default function* () {
    yield takeEvery(Types.REGISTER, regiUserSaga);
}
