<template>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="username">Tên đăng nhập:</label>
          <input id="username" v-model="user.username" type="text" required>
        </div>
        <div>
          <label for="password">Mật khẩu:</label>
          <input id="password" v-model="user.password" type="password" required>
        </div>
        <div>
          <label for="name">Tên:</label>
          <input id="name" v-model="user.name" type="text" required>
        </div>
        <div>
          <label for="phone">Số điện thoại:</label>
          <input id="phone" v-model="user.phone" type="text" required>
        </div>
        <div>
          <label for="address">Địa chỉ:</label>
          <input id="address" v-model="user.address" type="text" required>
        </div>
        <div>
            <label for="role">Chức vụ:</label>
            <select id="role" v-model="role">
                <option value="User">User</option>
                <option value="Admin">Admin</option>
            </select>
        </div>
        <button type="submit">Thêm</button>
      </form>
    </div>
  </template>
  
  <script>
import { addUser } from '@/services/authService.js';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
        name: '',
        phone: '',
        address: '',
      },
      role: 'User', // keep track of the role separately
    };
  },
  computed: {
    isAdmin() {
      return this.role === 'Admin';
    },
  },
  methods: {
    async submitForm() {
      try {
        const token = localStorage.getItem('token'); // Replace with your token
        const response = await addUser({
          ...this.user,
          isAdmin: this.isAdmin,
        }, token);
        alert('User created successfully');
      } catch (error) {
        console.error(error);
        alert('Failed to create user');
      }
    },
  },
};
</script>
  
<style scoped>
form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 15px;
  background-color: #f7f7f7;
  border-radius: 8px;
}

form div {
  margin-bottom: 10px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input[type="text"], form input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

form button {
  padding: 10px 20px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

form button:hover {
  background-color: #45a049;
}
form select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
</style>