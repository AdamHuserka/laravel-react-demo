import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://localhost:8000/api`
});

axiosClient.interceptors.request.use((config) => {
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    throw error;
});

export default axiosClient;
