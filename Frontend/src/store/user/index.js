import { createSetValueAction } from "../redux-helper";

export const Types = {
    REGISTER: "user/REGISTERR",
    SET_LOADING: "user/setLoading",
    GET_HISTORY: "user/getHistory",
    SET_VALUE: "user/setValue",
};

export const actions = {
    userRegister: (body) => ({ type: Types.REGISTER, body }),
    setLoading: (isLoading) => ({
        type: Types.SET_LOADING,
        isLoading,
    }),
    getHistory: (body) => ({ type: Types.GET_HISTORY, body }),
    setValue: createSetValueAction(Types.SET_VALUE),
};
