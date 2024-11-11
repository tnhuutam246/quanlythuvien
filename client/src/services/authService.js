import axios from '@/services/axiosService'; // Import service bạn đã tạo

export const registerUser = async (userData) => {
    try {
        const response = await axios.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi đăng ký:', error);
    }
};

export const addUser = async (userData, token) => {
    try {
        const response = await axios.post('/auth/adduser', userData, {
            headers: {
                token: `Bearer ${token}` // Thêm token vào header Authorization
            }
        }); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi đăng ký:', error);
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post('/auth/login', userData);
        const { user } = response.data; // Lấy thông tin người dùng từ phản hồi
        
        // Lưu token vào local storage (nếu bạn muốn vẫn lưu token)
        const { token } = response.data;
        localStorage.setItem('token', token);
        
        return user; // Trả về thông tin người dùng
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi đăng nhập:', error);
    }
};



