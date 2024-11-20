<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const chucVu = ref(localStorage.getItem('chucVu'));

const sidebarMenu = [
    { name: "Tất cả sách", icon: "fa-solid fa-igloo", path: "adminDashboard" },
    { name: "Thêm sách", icon: "fa-solid fa-cart-plus", path: "createProducts" },
    { name: "Thêm nhân viên", icon: "fa-solid fa-user-plus", path: "addAdmin" },
    { name: "Thêm nhà xuất bản", icon: "fa-solid fa-plus", path: "createNXB" },
    { name: "Danh sách nhân viên", icon: "fa-solid fa-users", path: "staffList" },
    { name: "Đơn mượn sách", icon: "fa-solid fa-bag-shopping", path: "ordersBook" },
    { name: "Danh sách nhà xuất bản", icon: "fa-solid fa-user", path: "NXBLists" },
    { name: "Danh sách đọc giả", icon: "fa-solid fa-users", path: "customers" },
];

const filteredSidebarListItem = computed(() => {
    if (chucVu.value === 'Quản trị viên') {
        return sidebarMenu;
    } else {
        return sidebarMenu.filter((item, index) => index !== 2 && index !== 4);
    }
});
</script>

<template>
    <div class="lg:flex flex-col min-h-screen w-96 bg-[#00697F] hidden">
        <div class="px-8 py-8">
            <h1 class="font-semibold text-2xl uppercase text-white"><i class="fa-solid fa-book"></i> - JEIKEI LIBRARY
            </h1>
        </div>
        <div class="flex flex-col space-y-1">
            <div class="pl-6">
                <div class="text-white">
                    <ul class="flex flex-col space-y-5">
                        <router-link :to="menu.path" class="flex items-center space-x-3 hover:bg-white p-4 cursor-pointer rounded-l-full group transition-all duration-300"
                            v-for="(menu, index) in filteredSidebarListItem" :key="index">
                            <i :class="menu.icon" class="text-[14px] font-semibold group-hover:text-[#00697F]"></i>
                            <a href="#" class="text-[14px] font-semibold group-hover:text-[#00697F]">
                                {{ menu.name }}
                            </a>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<style></style>