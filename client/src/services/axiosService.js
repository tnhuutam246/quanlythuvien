import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api' // Base URL của backend
});

// Thêm interceptor để thêm token vào tiêu đề Authorization
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
