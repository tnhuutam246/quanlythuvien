import axios from '@/services/axiosService'; 

export const getAllUsers = async (token) => {
    try {
        const response = await axios.get('/user', {
            headers: {
                token: `Bearer ${token}` // Thêm token vào header Authorization
            }
        }); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch data:', error);
    }
};
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`/user/find/${id}`); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch data:', error);
    }
};

export const editUser = async (data, id, token, ) => {
    try {
        const response = await axios.put(`/user/${id}`, data, {
            headers: {
                token: `Bearer ${token}` // Thêm token vào header Authorization
            }
        }); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch data:', error);
    }
};

export const deleteUser = async (id, token, ) => {
    try {
        const response = await axios.delete(`/user/${id}`, {
            headers: {
                token: `Bearer ${token}` 
            }
        }); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch data:', error);
    }
};

