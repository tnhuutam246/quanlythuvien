import axios from '@/services/axiosService'; // Import service bạn đã tạo

export const getAllBooks = async () => {
    try {
        const response = await axios.get('/sach');
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

export const getBookById = async (id) => {
    try {
        const response = await axios.get(`/sach/find/${id}`); // Sử dụng template literal để thêm giá trị của id vào URL
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

export const getRemainQuantity = async (id) => {
    try {
        const response = await axios.get(`/TGMS/count/${id}`); // Sử dụng template literal để thêm giá trị của id vào URL
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

export const deleteBook = async (id, token, ) => {
    try {
        const response = await axios.delete(`/sach/${id}`, {
            headers: {
                token: `Bearer ${token}` 
            }
        }); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch data:', error);
    }
};

export const editBook = async (data, id, token, ) => {
    try {
        const response = await axios.put(`/sach/${id}`, data, {
            headers: {
                token: `Bearer ${token}` // Thêm token vào header Authorization
            }
        }); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch data:', error);
    }
};

export const addBook = async (data, token, ) => {
    try {
        const response = await axios.post(`/sach`, data, {
            headers: {
                token: `Bearer ${token}` // Thêm token vào header Authorization
            }
        }); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch data:', error);
    }
};

