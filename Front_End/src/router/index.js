import { createRouter, createWebHistory } from "vue-router";
import { ref } from 'vue';
import Home from "../components/home/HomePage.vue";
import Details from "../components/home/Details.vue";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";
import BookHistory from "../components/home/Book_history.vue";
import Cart from "../components/home/Cart.vue";
import Profile from "../components/home/Profile.vue";
import EditProfile from "../components/home/Edit_profile.vue";
import Order from "../components/home/Orders.vue";
import adminLogin from "../components/auth/adminLogin.vue";
import addAdmin from "../components/auth/addAdmin.vue";
import adminDashboard from "../components/admin/adminDashboard.vue";
import customers from "../components/admin/Customers.vue";
import createProducts from "../components/admin/createProducts.vue";
import ordersBook from "../components/admin/ordersBook.vue";
import editProduct from "../components/admin/editProduct.vue";
import createNXB from "../components/admin/createNXB.vue";
import NXBLists from "../components/admin/NXBLists.vue";
import Errors from "../components/errors/404.vue";
import CreateCustomer from "../components/admin/createCustomer.vue";
import EditCustomer from "../components/admin/editCustomer.vue";
import EditNXB from "../components/admin/editNXB.vue";
import StaffList from "../components/admin/staffList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/details",
    name: "details",
    component: Details,
  },
  {
    path: "/book_history",
    name: "book_history",
    component: BookHistory,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/editprofile",
    name: "edit_profile",
    component: EditProfile,
  },
  {
    path: "/order",
    name: "order",
    component: Order,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/admin/login",
    name: "adminLogin",
    component: adminLogin,
  },
  {
    path: "/admin/addAdmin",
    name: "addAdmin",
    component: addAdmin,
  },
  {
    path: "/admin/staffList",
    name: "StaffList",
    component: StaffList,
  },
  {
    path: "/admin/adminDashboard",
    name: "adminDashboard",
    component: adminDashboard,
  },
  {
    path: "/admin/customers",
    name: "customers",
    component: customers,
  },
  {
    path: "/admin/createProducts",
    name: "createProducts",
    component: createProducts,
  },
  {
    path: "/admin/ordersBook",
    name: "ordersBook",
    component: ordersBook,
  },
  {
    path: "/admin/editProduct/:maSach",
    name: "editProduct",
    component: editProduct,
  },
  {
    path: "/admin/createNXB",
    name: "createNXB",
    component: createNXB,
  },
  {
    path: "/admin/EditNXB/:maNXB",
    name: "EditNXB",
    component: EditNXB,
  },
  {
    path: "/admin/NXBLists",
    name: "NXBLists",
    component: NXBLists,
  },
  {
    path: "/admin/createCustomer",
    name: "CreateCustomer",
    component: CreateCustomer,
  },
  {
    path: "/admin/editCustomer",
    name: "EditCustomer",
    component: EditCustomer,
  },
  {
    path: "/notFound",
    name: "Errors",
    component: Errors,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
const isLoading = ref(false);
router.beforeEach((to, from, next) => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    next();
  }, 1000);
});

export { router, isLoading };
export default router;