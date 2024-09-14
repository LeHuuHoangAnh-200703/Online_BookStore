<template>
  <div id="app">
    <header>
      <div
        class="relative flex items-center justify-between lg:py-4 lg:px-20 p-4"
      >
        <div class="px-4">
          <h1
            class="font-bold lg:text-2xl text-[14px] uppercase text-[#4169E1]"
          >
            <i class="fa-solid fa-book"></i> - BookStore
          </h1>
        </div>
        <div class="lg:flex hidden flex-1 gap-4 max-w-xl">
          <input
            type="text"
            class="items-center w-full p-4 border border-gray-400 text-base font-semibold tracking-wider text-black bg-white/10 rounded-lg focus:outline-none"
            placeholder="Tìm kiếm tên sách ..."
          />
          <button
            class="font-bold text-lg bg-[#4169E1] text-white px-4 py-2 rounded-lg whitespace-nowrap"
          >
            Tìm kiếm
          </button>
        </div>
        <ul class="lg:flex hidden">
          <li class="px-[15px] lg:px-[26px] text-[20px] group">
            <a href="" class="font-bold">Lịch sử mượn sách</a>
            <div
              class="h-[2px] bg-[#4169E1] scale-x-0 group-hover:scale-100 rounded-full transition-all ease-out origin-left duration-500"
            ></div>
          </li>
        </ul>
        <div class="flex items-center lg:space-x-8 space-x-5 px-4">
          <div
            class="flex space-x-4 items-center justify-center cursor-pointer"
          >
            <img
              src="../src/assets/img/avatar-1.jpg"
              class="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] rounded-full border-2 border-[#C0C0C0]"
              alt=""
            />
          </div>
          <div>
            <div class="relative">
              <div
                class="absolute top-[-12px] right-[-10px] flex justify-center items-center w-6 h-6 bg-[#4169E1] rounded-full"
              >
                <span class="text-white font-bold text-base">1</span>
              </div>
              <button>
                <i class="fa-solid fa-cart-shopping text-[26px]"></i>
              </button>
            </div>
          </div>
          <button class="open-menu lg:hidden block">
            <i class="fa-solid fa-bars text-[26px] text-[#4169E1]"></i>
          </button>
        </div>
        <div
          class="sidebar fixed top-0 -left-[100%] bg-[#fff] p-4 w-full h-full z-40"
        >
          <h1
            class="font-bold text-xl uppercase text-[#4169E1]"
          >
            <i class="fa-solid fa-book"></i> - BookStore
          </h1>
          <button class="closed">
            <i
              class="fa-solid fa-x absolute top-3 right-4 text-2xl text-[#4169E1] p-4 ease-out duration-[0.4s] hover:scale-[1.1]"
            ></i>
          </button>
          <ul class="flex flex-col my-10">
            <form action="" method="post" class="relative mb-4 flex space-x-4">
              <input
                type="text"
                class="items-center w-full p-4 border border-gray-400 text-base font-semibold tracking-wider text-black bg-white/10 rounded-lg focus:outline-none"
                placeholder="Tìm kiếm tên sách ..."
              />
              <button
                class="font-bold text-lg bg-[#4169E1] text-white px-4 py-2 rounded-lg whitespace-nowrap"
              >
                Tìm kiếm
              </button>
            </form>
            <li class="pb-[15px]">
              <a
                href=""
                class="border-b-2 border-transparent hover:border-b-2 hover:border-[#4169E1] font-semibold text-[20px] hover:text-[#4169E1] transition-colors duration-300"
                >Lịch sử mượn sách</a
              >
            </li>
          </ul>
        </div>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const openMenu = $(".open-menu");
  const closeMenu = $(".closed");
  const sidebar = $(".sidebar");

  openMenu.on("click", function () {
    sidebar.animate({ left: "0" }, 400);
  });

  closeMenu.on("click", function () {
    sidebar.animate({ left: "-100%" }, 400);
  });
});
</script>
