// /src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Books from '../views/Books.vue'
import Profile from '../views/user/Profile.vue'
import Book from '../views/Book.vue'
import BorrowedBooks from '../views/user/BorrowedBooks.vue'
import UserAdmin from '@/views/admin/UserAdmin.vue'
import EditUser from '@/views/admin/manage/EditUser.vue'
import AddUser from '@/views/admin/manage/AddUser.vue'
import BookAdmin from '@/views/admin/BookAdmin.vue'
import EditBook from '@/views/admin/manage/EditBook.vue'
import AddBook from '@/views/admin/manage/AddBook.vue'
import PublisherAdmin from '@/views/admin/PublisherAdmin.vue'
import EditPublisher from '@/views/admin/manage/EditPublisher.vue'
import AddPublisher from '@/views/admin/manage/AddPublisher.vue'
import BorrowedBooksAdmin from '@/views/admin/BorrowedBooksAdmin.vue'
import EditBorrowedBooks from '@/views/admin/manage/EditBorrowedBooks.vue'
import AddBorrowedBook from '@/views/admin/manage/AddBorrowedBook.vue'


const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/books',
    name: 'books',
    component: Books
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/book/:id',
    name: 'book',
    component: Book
  },
  {
    path: '/borrowedbooks/:id',
    name: 'borrowedbooks',
    component: BorrowedBooks
  },
  {
    path: '/admin/users',
    name: 'userAdmin',
    component: UserAdmin
  },
  {
    path: '/admin/edituser/:id',
    name: 'editUser',
    component: EditUser
  },
  {
    path: '/admin/adduser',
    name: 'addUser',
    component: AddUser
  },
  {
    path: '/admin/books',
    name: 'bookAdmin',
    component: BookAdmin
  },
  {
    path: '/admin/editbook/:id',
    name: 'editBook',
    component: EditBook
  },
  {
    path: '/admin/addbook',
    name: 'addBook',
    component: AddBook
  },
  {
    path: '/admin/publishers',
    name: 'publisherAdmin',
    component: PublisherAdmin
  },
  {
    path: '/admin/editpublisher/:id',
    name: 'editPublisher',
    component: EditPublisher
  },
  {
    path: '/admin/addpublisher',
    name: 'addPublisher',
    component: AddPublisher
  },
  {
    path: '/admin/borrowedbooks',
    name: 'borrowedBooksAdmin',
    component: BorrowedBooksAdmin
  },
  {
    path: '/admin/editborrowedbooks/:id',
    name: 'editBorrowedBooks',
    component: EditBorrowedBooks
  },
  {
    path: '/admin/addborrowedbook',
    name: 'addBorrowedBook',
    component: AddBorrowedBook
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
