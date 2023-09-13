export const Types = {
    REGISTER: "user/REGISTERR",
    SET_LOADING: "user/setLoading",
};

export const actions = {
    userRegister: (body) => ({ type: Types.REGISTER, body }),
    setLoading: (isLoading) => ({
        type: Types.SET_LOADING,
        isLoading,
    }),
};
