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
    path: "/details/:maSach",
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
    path: "/profile/:maDocGia",
    name: "profile",
    component: Profile,
  },
  {
    path: "/editprofile/:maDocGia",
    name: "edit_profile",
    component: EditProfile,
  },
  {
    path: "/order/:maSach",
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
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/staffList",
    name: "StaffList",
    component: StaffList,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/editStaffInfo/:maNhanVien",
    name: "EditStaffInfo",
    component: EditStaffInfo,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/adminDashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/customers",
    name: "Customers",
    component: Customers,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/createProducts",
    name: "CreateProducts",
    component: CreateProducts,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/createOrderBook",
    name: "CreateOrdersBook",
    component: CreateOrdersBook,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/editOrderBook/:id",
    name: "EditOrderBook",
    component: EditOrderBook,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/ordersBook",
    name: "OrdersBook",
    component: OrdersBook,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/editProduct/:maSach",
    name: "EditProduct",
    component: EditProduct,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/createNXB",
    name: "CreateNXB",
    component: CreateNXB,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/EditNXB/:maNXB",
    name: "EditNXB",
    component: EditNXB,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/NXBLists",
    name: "NXBLists",
    component: NXBLists,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/createCustomer",
    name: "CreateCustomer",
    component: CreateCustomer,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/editCustomer/:maDocGia",
    name: "EditCustomer",
    component: EditCustomer,
    meta: { requiresAuth: true },
  },
  {
    path: "/notFound",
    name: "Errors",
    component: Errors,
    meta: { requiresAuth: true },
  },
  {
    path: "/notFound",
    name: "Errors",
    component: Errors,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
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
  
  // Kiểm tra xem route có yêu cầu xác thực không
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Kiểm tra trạng thái đăng nhập
    if (!localStorage.getItem('chucVu')) {
      next({ path: '/admin/login' }); // Chuyển hướng đến trang đăng nhập
    } else {
      next(); // Nếu đã đăng nhập, cho phép truy cập
    }
  } else {
    next(); // Nếu không cần xác thực, cho phép truy cập
  }

  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

export { router, isLoading };
export default router;