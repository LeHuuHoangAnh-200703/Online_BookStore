<script setup>
const sidebarMenu = [
    {
        children: [
            { name: "Tất cả sản phẩm", icon: "fa-solid fa-igloo", path: "adminDashboard"},
            { name: "Thêm sản phẩm", icon: "fa-solid fa-cart-plus", path: "createProducts"},
            { name: "Thêm nhân viên", icon: "fa-solid fa-user-plus", path: "addAdmin"},
            { name: "Danh sách nhân viên", icon: "fa-solid fa-users", path: "staffList"},
            { name: "Thêm đơn mượn sách", icon: "fa-solid fa-square-plus", path: "createOrderBook"},
            { name: "Đơn mượn sách", icon: "fa-solid fa-bag-shopping", path: "ordersBook"},
            { name: "Thêm nhà xuất bản", icon: "fa-solid fa-plus", path: "createNXB"},
            { name: "Danh sách nhà xuất bản", icon: "fa-solid fa-user", path: "NXBLists"},
            { name: "Thêm đọc giả", icon: "fa-solid fa-circle-plus", path: "createCustomer"},
            { name: "Danh sách đọc giả", icon: "fa-solid fa-users", path: "customers"},
        ],
    },
];
</script>

<template>
    <div class="lg:flex flex-col min-h-screen w-96 bg-[#00697F] hidden">
        <div class="px-8 py-8">
            <h1 class="font-semibold text-2xl uppercase text-white"><i class="fa-solid fa-book"></i> - JEIKEI LIBRARY
            </h1>
        </div>
        <div class="flex flex-col space-y-1">
            <div class="pl-6">
                <div class="text-white" v-for="(menu, index) in sidebarMenu" :key="index">
                    <ul class="flex flex-col space-y-5">
                        <router-link :to="item.path" class="flex items-center space-x-3 hover:bg-white p-4 cursor-pointer rounded-l-full group transition-all duration-300"
                            v-for="(item, index) in menu.children" :key="index">
                            <i :class="item.icon" class="text-[14px] font-semibold group-hover:text-[#00697F]"></i>
                            <a href="#" class="text-[14px] font-semibold group-hover:text-[#00697F]">
                                {{ item.name }}
                            </a>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<style></style>