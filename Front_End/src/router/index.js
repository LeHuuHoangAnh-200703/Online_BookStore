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
import AdminLogin from "../components/auth/adminLogin.vue";
import AddAdmin from "../components/auth/addAdmin.vue";
import AdminDashboard from "../components/admin/adminDashboard.vue";
import Customers from "../components/admin/Customers.vue";
import CreateProducts from "../components/admin/createProducts.vue";
import OrdersBook from "../components/admin/ordersBook.vue";
import EditProduct from "../components/admin/editProduct.vue";
import CreateNXB from "../components/admin/createNXB.vue";
import NXBLists from "../components/admin/NXBLists.vue";
import Errors from "../components/errors/404.vue";
import CreateCustomer from "../components/admin/createCustomer.vue";
import EditCustomer from "../components/admin/editCustomer.vue";
import EditNXB from "../components/admin/editNXB.vue";
import StaffList from "../components/admin/staffList.vue";
import EditStaffInfo from "../components/admin/editStaffInfo.vue";
import CreateOrdersBook from "../components/admin/createOrdersBook.vue";
import EditOrderBook from "../components/admin/editOrderBook.vue";

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
    name: "AdminLogin",
    component: AdminLogin,
  },
  {
    path: "/admin/addAdmin",
    name: "AddAdmin",
    component: AddAdmin,
  },
  {
    path: "/admin/staffList",
    name: "StaffList",
    component: StaffList,
  },
  {
    path: "/admin/editStaffInfo/:maNhanVien",
    name: "EditStaffInfo",
    component: EditStaffInfo,
  },
  {
    path: "/admin/adminDashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
  },
  {
    path: "/admin/customers",
    name: "Customers",
    component: Customers,
  },
  {
    path: "/admin/createProducts",
    name: "CreateProducts",
    component: CreateProducts,
  },
  {
    path: "/admin/createOrderBook",
    name: "CreateOrdersBook",
    component: CreateOrdersBook,
  },
  {
    path: "/admin/editOrderBook/:id",
    name: "EditOrderBook",
    component: EditOrderBook,
  },
  {
    path: "/admin/ordersBook",
    name: "OrdersBook",
    component: OrdersBook,
  },
  {
    path: "/admin/editProduct/:maSach",
    name: "EditProduct",
    component: EditProduct,
  },
  {
    path: "/admin/createNXB",
    name: "CreateNXB",
    component: CreateNXB,
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
    path: "/admin/editCustomer/:maDocGia",
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