import axios from "axios";

const axiosInstance = axios.create({
    /* Now we are using vite. When using vite, if you want to use environment variables,
     you can enter the environment variables after import.meta.env. */
    baseURL: import.meta.env.PROD ? "" : "http://localhost:4000",
});

// https://axios-http.com/docs/interceptors
// When you send a request or receive a response,
// use interceptors if you want to do something before doing that.
axiosInstance.interceptors.request.use(
    function (config) {
        // Typically, the token is sent in the Authorization field of the request header.
        // Bearer: Use a token for JWT or OAuth.
        // It's handled differently depending on the token sent, and since we're using a JWT,
        // we need to use a bearer.
        config.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosInstance;
