<template>
    <Form @submit="submitRegister" :validation-schema="registerFormSchema">
        <div class="form-group">
            <label for="username">Tên đăng nhập</label>
            <Field name="username" type="text" class="form-control" />
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>   
        <div class="form-group">
            <label for="name">Họ tên</label>
            <Field name="name" type="text" class="form-control" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <Field name="phone" type="text" class="form-control" />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
              <button type="submit" class="btn btn-primary">Lưu</button>
        </div>
    </Form>
  </template>
  
  <script>
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from 'yup';
  import { registerUser } from "@/services/authService";

  
  export default {
      components: {
          Form,
          Field,
          ErrorMessage,
      },
      data() {
          return {
              registerFormSchema: yup.object().shape({
                  username: yup.string().required('Tên đăng nhập là bắt buộc'),
                  password: yup.string().required('Mật khẩu là bắt buộc'),
                  name: yup.string().required('Họ tên là bắt buộc'),
                  phone: yup.string().required('Số điện thoại là bắt buộc'),
                  address: yup.string().required('Địa chỉ là bắt buộc'),
              })
          };
      },
      methods: {
          async submitRegister(registerData) {
              try {
                  await registerUser(registerData);
                  this.$router.push('/login');
              } catch (error) {
                  console.error('Đã xảy ra lỗi khi đăng ký:', error.message);
              }
          }
      },
  };
  </script>
  
  <style scoped>
  @import "../assets/form.css";
  </style>
  