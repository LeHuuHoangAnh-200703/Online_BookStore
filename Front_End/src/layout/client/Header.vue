<script setup>
import { onMounted } from "vue";
import axios from 'axios';
import { ref } from "vue";

const userInfo = ref({});

// Hàm để lấy thông tin người dùng
const getUserInfo = async () => {
  const token = localStorage.getItem('token'); // Lấy token từ localStorage
  try {
    const response = await axios.get('http://localhost:5000/api/docgia/current', {
      headers: { Authorization: token } // Gửi token trong header
    });
    userInfo.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error);
  }
};

// Hàm để xử lý đăng xuất
const logout = () => {
  localStorage.removeItem('token'); // Xóa token khỏi localStorage
  // Có thể thêm logic để chuyển hướng đến trang đăng nhập
};
onMounted(() => {
  const openMenu = $(".open-menu");
  const closeMenu = $(".closed");
  const sidebar = $(".sidebar");
  const user = $(".user");
  const info = $(".info");
  let isVisible = false;

  openMenu.on("click", function () {
    sidebar.animate({ left: "0" }, 400);
  });

  closeMenu.on("click", function () {
    sidebar.animate({ left: "-100%" }, 400);
  });

  user.on("click", function () {
    if (isVisible) {
      info.animate({ right: "50" }, 400);
    } else {
      info.animate({ right: "-100%" }, 400);
    }
    isVisible = !isVisible;
  });

  getUserInfo();
});
</script>

<template>
  <header>
    <div class="relative flex items-center justify-between lg:py-4 lg:px-10 p-4">
      <div class="px-4">
        <h1 class="font-bold lg:text-2xl text-[14px] uppercase text-[#00697F]">
          <i class="fa-solid fa-book"></i> - JEIKEI LIBRARY
        </h1>
      </div>
      <div class="lg:flex hidden flex-1 gap-4 max-w-xl">
        <input type="text"
          class="items-center w-full p-4 border border-gray-400 text-base font-semibold tracking-wider text-black bg-white/10 rounded-lg focus:outline-none"
          placeholder="Tìm kiếm tên sách ..." />
        <button class="font-bold text-lg bg-[#00697F] text-white px-4 py-2 rounded-lg whitespace-nowrap">
          Tìm kiếm
        </button>
      </div>
      <ul class="lg:flex hidden">
        <li class="px-[15px] text-[20px] group">
          <router-link to="/login" class="font-bold">Đăng nhập</router-link>
          <div
            class="h-[2px] bg-[#00697F] scale-x-0 group-hover:scale-100 rounded-full transition-all ease-out origin-left duration-500">
          </div>
        </li>
        <li class="px-[15px] text-[20px] group">
          <router-link to="/" class="font-bold">Trang chủ</router-link>
          <div
            class="h-[2px] bg-[#00697F] scale-x-0 group-hover:scale-100 rounded-full transition-all ease-out origin-left duration-500">
          </div>
        </li>
        <li class="px-[15px] text-[20px] group">
          <router-link to="/book_history" class="font-bold">Lịch sử mượn sách</router-link>
          <div
            class="h-[2px] bg-[#00697F] scale-x-0 group-hover:scale-100 rounded-full transition-all ease-out origin-left duration-500">
          </div>
        </li>
      </ul>
      <div class="flex items-center lg:space-x-8 space-x-5 px-4">
        <div class="user flex space-x-4 items-center justify-center cursor-pointer">
          <img src="../../assets/img/avatar.jpg"
            class="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] rounded-full border-2 border-[#C0C0C0]" alt="" />
        </div>
        <div>
          <div class="relative">
            <div
              class="absolute top-[-12px] right-[-10px] flex justify-center items-center w-6 h-6 bg-[#00697F] rounded-full">
              <span class="text-white font-bold text-base">1</span>
            </div>
            <button>
              <i class="fa-solid fa-cart-shopping text-[26px]"></i>
            </button>
          </div>
        </div>
        <button class="open-menu lg:hidden block">
          <i class="fa-solid fa-bars text-[26px] text-[#00697F]"></i>
        </button>
      </div>
      <div class="sidebar fixed top-0 -left-[100%] bg-[#fff] p-4 w-full h-full z-40">
        <div class="flex justify-between items-center p-2">
          <h1 class="font-bold text-xl uppercase text-[#00697F]">
            <i class="fa-solid fa-book"></i> - JEIKEI LIBRARY
          </h1>
          <button class="closed">
            <i class="fa-solid fa-x text-2xl text-[#00697F] ease-out duration-[0.4s] hover:scale-[1.1]"></i>
          </button>
        </div>
        <ul class="flex flex-col my-10">
          <form action="" method="post" class="relative mb-4 flex space-x-4">
            <input type="text"
              class="items-center w-full p-4 border border-gray-400 text-base font-semibold tracking-wider text-black bg-white/10 rounded-lg focus:outline-none"
              placeholder="Tìm kiếm tên sách ..." />
            <button class="font-bold text-lg bg-[#00697F] text-white px-4 py-2 rounded-lg whitespace-nowrap">
              Tìm kiếm
            </button>
          </form>
          <li class="py-[15px]">
            <router-link to="/login"
              class="border-b-2 border-transparent hover:border-b-2 hover:border-[#00697F] font-semibold text-[20px] hover:text-[#00697F] transition-colors duration-300">Đăng
              nhập</router-link>
          </li>
          <li class="py-[15px]">
            <router-link to="/"
              class="border-b-2 border-transparent hover:border-b-2 hover:border-[#00697F] font-semibold text-[20px] hover:text-[#00697F] transition-colors duration-300">Trang
              chủ</router-link>
          </li>
          <li class="py-[15px]">
            <router-link to="/book_history"
              class="border-b-2 border-transparent hover:border-b-2 hover:border-[#00697F] font-semibold text-[20px] hover:text-[#00697F] transition-colors duration-300">Lịch
              sử mượn sách</router-link>
          </li>
        </ul>
      </div>
      <div
        class="info absolute top-24 right-[-100%] flex flex-col gap-3 p-6 border-2 border-[#C0C0C0] rounded-2xl bg-[#fff] shadow-md z-10">
        <div class="flex gap-3">
          <img src="../../assets/img/avatar.jpg"
            class="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] rounded-full border-2 border-[#C0C0C0]"
            alt="User Avatar" />
          <div class="flex flex-col gap-1">
            <p class="text-[18px] font-semibold">{{ userInfo.name }}</p>
            <p class="text-[#00697F] text-[14px]">{{ userInfo.email }}</p>
          </div>
        </div>
        <hr class="bg-[#00697F]" />
        <div class="flex flex-col gap-3">
          <div
            class="flex gap-3 items-center hover:bg-[#00697F] cursor-pointer p-2 transition-all duration-300 rounded-md group">
            <i class="fa-solid fa-user text-[#00697F] group-hover:text-white"></i>
            <a href="#" class="text-lg font-semibold text-gray-800 group-hover:text-white">Hồ Sơ</a>
          </div>
          <div
            class="flex gap-3 items-center hover:bg-[#00697F] cursor-pointer p-2 transition-all duration-300 rounded-md group">
            <i class="fa-solid fa-gear text-[#00697F] group-hover:text-white"></i>
            <a href="#" class="text-lg font-semibold text-gray-800 group-hover:text-white">Chỉnh sửa hồ sơ</a>
          </div>
        </div>
        <hr class="bg-[#00697F]" />
        <div
          class="flex gap-3 items-center hover:bg-[#00697F] cursor-pointer p-2 transition-all duration-300 rounded-md group">
          <i class="fa-solid fa-right-to-bracket text-[#00697F] group-hover:text-white"></i>
          <a href="#" class="text-lg font-semibold text-gray-800 group-hover:text-white">Đăng xuất</a>
        </div>
      </div>
    </div>
  </header>
</template>

<style></style>