<script setup>
import { onMounted } from 'vue';

const sidebarMenu = [
    { name: "Tất cả sản phẩm", icon: "fa-solid fa-igloo", path: "adminDashboard"},
    { name: "Danh sách người dùng", icon: "fa-solid fa-users", path: "customers"},
    { name: "Thêm sản phẩm", icon: "fa-solid fa-cart-plus", path: "createProducts"},
    { name: "Thêm admin", icon: "fa-solid fa-user-plus", path: "addAdmin"},
    { name: "Đơn mượn sách", icon: "fa-solid fa-bag-shopping", path: "ordersBook"},
    { name: "Thêm nhà xuất bản", icon: "fa-solid fa-plus", path: "createNXB"},
    { name: "Danh sách nhà xuất bản", icon: "fa-solid fa-user", path: "NXBLists"},
];

onMounted(() => {
    const openMenu = $(".open-menu");
    const closeMenu = $(".closed");
    const sidebar = $(".sidebar");

    openMenu.on("click", () => {
        sidebar.animate({left: 0}, 400);
    });

    closeMenu.on("click", () => {
        sidebar.animate({left: "-100%"}, 400);
    })

})
</script>
<template>
    <div class="w-full">
        <div class="flex py-6 px-8 shadow-lg">
            <div class="flex items-center justify-between space-x-8 w-full">
                <button class="open-menu lg:hidden block">
                    <i class="fa-solid fa-bars text-[28px] text-[#00697F]"></i>
                </button>
                <div class="flex flex-col gap-2">
                    <p class="text-[16px] lg:text-[20px] font-bold">Lê Hữu Hoàng Anh</p>
                    <p class="text-[14px] text-[#00697F] font-semibold">hoanganh@gmail.com</p>
                </div>
                <button
                    class="hidden lg:block px-5 py-3 bg-[#00697F] text-white rounded-2xl font-semibold text-[16px] lg:text-[18px] hover:scale-110 transition-all duration-200">Đăng
                    xuất</button>
            </div>
            <div class="sidebar fixed top-0 -left-[100%] bg-white p-4 w-full h-full z-40">
                <div class="flex justify-between items-center p-2">
                    <h1 class="font-bold text-xl uppercase text-[#00697F]">
                        <i class="fa-solid fa-book"></i> - JEIKEI LIBRARY
                    </h1>
                    <button class="closed">
                        <i
                            class="fa-solid fa-x text-2xl text-[#00697F] ease-out duration-[0.4s] hover:scale-[1.1]"></i>
                    </button>
                </div>
                <ul class="flex flex-col my-10">
                    <li class="py-[15px] flex gap-3 text-[#333f48] group cursor-pointer" v-for="(item, index) in sidebarMenu" :key="index">
                        <i :class="item.icon" class="text-lg font-semibold group-hover:text-[#00697F]"></i>
                        <router-link :to="item.path"
                            class="border-b-2 border-transparent hover:border-b-2 group-hover:border-[#00697F] font-semibold text-[20px] group-hover:text-[#00697F] transition-colors duration-300">{{ item.name }}</router-link>
                    </li>
                    <a href="" class="text-[20px] text-[#333f48] mt-2 font-semibold group-hover:text-[#00697F]"><i class="fa-solid fa-right-from-bracket pr-1"></i> Đăng xuất</a>
                </ul>
            </div>
        </div>
    </div>
</template>

<style></style>