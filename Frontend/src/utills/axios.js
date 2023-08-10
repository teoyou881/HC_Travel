import axios from "axios";

const axiosInstance = axios.create({
    /* Now we are using vite. When using vite, if you want to use environment variables,
     you can enter the environment variables after import.meta.env. */
    baseURL: import.meta.env.PROD ? "" : "http://localhost:4000",
});

export default axiosInstance;
