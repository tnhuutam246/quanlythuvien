<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/books">
        {{ getUser ? (getUser.isAdmin ? 'Thư viện - Admin' : 'Thư viện - User') : 'Thư viện' }}
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{ name: 'books' }" class="nav-link active" aria-current="page">Trang chủ</router-link>
  
          </li>
          <li class="nav-item">
            <router-link v-if="getUser && getUser.isAdmin" :to="{ name: 'userAdmin' }" class="nav-link active" aria-current="page">Nguời dùng</router-link>
            <router-link v-else :to="{ name: 'books' }" class="nav-link">Sách</router-link>
          </li>
          <li>
            <router-link v-if="getUser && !getUser.isAdmin" :to="{ name: 'profile' }" class="nav-link">Thông tin cá nhân</router-link>
            <router-link v-if="getUser && getUser.isAdmin" :to="{ name: 'bookAdmin' }" class="nav-link">Sách</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="getUser && !getUser.isAdmin" :to="'/borrowedbooks/' + getUser._id" class="nav-link">Thông tin mượn sách</router-link>
            <router-link v-if="getUser && getUser.isAdmin" :to="{ name: 'publisherAdmin' }" class="nav-link">Nhà xuất bản</router-link>
          </li>
          <li class="nav-item">
            <!-- <router-link v-if="getUser && !getUser.isAdmin" :to="'/borrowedbooks/' + getUser._id" class="nav-link">Theo dõi mượn sách</router-link> -->
            <router-link v-if="getUser && getUser.isAdmin" :to="{ name: 'borrowedBooksAdmin' }" class="nav-link">Theo dõi mượn sách</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <router-link v-if="getUser" :to="{ name: 'books' }" @click="logout" class="btn btn-outline-dark me-2 logout-button">Đăng xuất</router-link>
          <router-link v-if="getUser === null" :to="{ name: 'login' }" class="btn btn-outline-dark me-2">Đăng nhập</router-link>
          <router-link v-if="getUser === null" :to="{ name: 'register' }" class="btn btn-outline-dark">Đăng ký</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    ...mapActions(['logout']),
    async setUserFromLocalStorage() {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        await this.$store.commit('SET_USER', user);
      }
    },
  },
  async created() {
    await this.setUserFromLocalStorage();
  },
};
</script>

<style scoped>
.navbar {
  background-color: #b0d0f0;
  padding-left: 32px;
  padding-right: 32px;
}

.nav-link {
  margin-right: 10px; /* Increase space between links */
  color: #333; /* Change color to dark grey */
}

.nav-link:hover {
  color: #000; /* Change color to black when hovered */
}

.logout-button {
  color: red; /* Change color to red */
}
</style>