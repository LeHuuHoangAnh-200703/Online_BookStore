<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const chucVu = ref(localStorage.getItem('chucVu'));
const TenNV = ref('');
const ChucVuNV = ref('');

const sidebarMenu = [
    { name: "Tất cả sản phẩm", icon: "fa-solid fa-igloo", path: "adminDashboard"},
    { name: "Thêm sản phẩm", icon: "fa-solid fa-cart-plus", path: "createProducts"},
    { name: "Thêm nhân viên", icon: "fa-solid fa-user-plus", path: "addAdmin"},
    { name: "Thêm đơn mượn sách", icon: "fa-solid fa-square-plus", path: "createOrderBook"},
    { name: "Thêm nhà xuất bản", icon: "fa-solid fa-plus", path: "createNXB"},
    { name: "Thêm đọc giả", icon: "fa-solid fa-circle-plus", path: "createCustomer"},
    { name: "Danh sách nhân viên", icon: "fa-solid fa-users", path: "staffList"},
    { name: "Đơn mượn sách", icon: "fa-solid fa-bag-shopping", path: "ordersBook"},
    { name: "Danh sách nhà xuất bản", icon: "fa-solid fa-user", path: "NXBLists"},
    { name: "Danh sách đọc giả", icon: "fa-solid fa-users", path: "customers"},
];

const filteredSidebarListItem = computed(() => {
    if (chucVu.value === 'Quản lý') {
        return sidebarMenu;
    } else {
        return sidebarMenu.filter((item, index) => index !== 2 && index !== 6);
    }
});

const dangXuat = () => {
    localStorage.removeItem('chucVu');
    router.push('/admin/login');
};

onMounted(() => {
    const openMenu = $(".open-menu");
    const closeMenu = $(".closed");
    const sidebar = $(".sidebar");

    TenNV.value = localStorage.getItem('tenNhanVien') || 'Your Name';
    ChucVuNV.value = localStorage.getItem('chucVu') || 'Chưa có';

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
                    <p class="text-[16px] lg:text-[20px] font-bold">{{ TenNV }}</p>
                    <p class="text-[14px] font-semibold">Chức vụ : <span class="text-[#00697F]">{{ ChucVuNV }}</span></p>
                </div>
                <button @click="dangXuat"
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
                <ul class="flex flex-col my-2">
                    <li class="py-[15px] flex gap-3 text-[#333f48] group cursor-pointer" v-for="(item, index) in filteredSidebarListItem" :key="index">
                        <i :class="item.icon" class="text-[14px] font-semibold group-hover:text-[#00697F]"></i>
                        <router-link :to="item.path"
                            class="border-b-2 border-transparent hover:border-b-2 group-hover:border-[#00697F] font-semibold text-[14px] group-hover:text-[#00697F] transition-colors duration-300">{{ item.name }}</router-link>
                    </li>
                    <a href="" @click.prevent="dangXuat" class="text-[14px] text-[#333f48] mt-2 font-semibold group-hover:text-[#00697F]"><i class="fa-solid fa-right-from-bracket pr-1"></i> Đăng xuất</a>
                </ul>
            </div>
        </div>
    </div>
</template>

<style></style>