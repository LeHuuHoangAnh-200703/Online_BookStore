<script setup>
import sidebar from '../../layout/admin/Sidebar.vue';
import navbar from '../../layout/admin/Navbar.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);
const notification = ref({
    message: "",
    type: ""
});

const fetchProducts = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/sach');
        products.value = response.data.map(product => {
            return {
                ...product,
                Image: product.Image ? `/src${product.Image}` : 'default-image-url.png' // Thêm /src vào đường dẫn hình ảnh
            };
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const deleteProduct = async (maSach) => {
    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
    if (!confirmDelete) return;

    try {
        await axios.delete(`http://localhost:5000/api/sach/maSach/${maSach}`);
        products.value = products.value.filter(product => product.MaSach !== maSach);
        notification.value = {
            message: 'Sản phẩm đã được xóa thành công!',
            type: 'success'
        };
    } catch (error) {
        console.error('Error deleting product:', error);
        notification.value = {
            message: 'Có lỗi xảy ra, vui lòng thử lại!',
            type: 'error'
        };
    }
    setTimeout(() => {
        notification.value.message = '';
    }, 3000);
};

const formatCurrency = (value) => {
    const formattedValue = value * 1000;
    return formattedValue.toLocaleString('vi-VN') + ' ' + 'VNĐ';
};

onMounted(() => {
    fetchProducts();
});
</script>

<template>
    <div class="flex font-sans">
        <sidebar />
        <div class="flex flex-col w-full overflow-auto">
            <navbar />
            <div class="relative w-[95%] mx-auto h-full overflow-hidden">
                <div class="text-center py-4">
                    <h2 class="text-[#333] font-bold text-[20px]">DANH SÁCH SẢN PHẨM</h2>
                </div>
                <div id="all_products" class="overflow-y-auto max-h-[calc(100vh-200px)]">
                    <table class="w-full border-collapse bg-white whitespace-nowrap text-center text-sm text-gray-500">
                        <thead class="bg-gray-200">
                            <tr>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Mã sách</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Mã NXB</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Tên sách</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Đơn giá</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Năm xuất bản</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Loại sách</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Số quyển</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Ảnh sản phẩm</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Tác giả</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Mô tả</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Điều chỉnh</th>
                            </tr>
                        </thead>
                        <tbody class="w-full">
                            <tr class="border-t border-slate-500" v-for="product in products" :key="product.id">
                                <td class="px-6 py-4 font-medium text-gray-900">{{ product.MaSach }}</td>
                                <td class="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">{{ product.MaNXB
                                    }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-ellipsis overflow-hidden max-w-48">
                                    <p class="overflow-hidden text-ellipsis whitespace-nowrap">{{ product.TenSach }}</p>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">{{
                                    formatCurrency(product.DonGia) }}</td>
                                <td class="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">{{
                                    product.NamXuatBan }}</td>
                                <td class="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">{{ product.Type }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">{{ product.SoQuyen
                                    }}</td>
                                <td><img class="w-[125px] py-2" :src="product.Image" alt="Hình ảnh sản phẩm"
                                        v-if="product.Image" /></td>
                                <td class="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">{{ product.TacGia
                                    }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-ellipsis overflow-hidden max-w-48">
                                    <p class="overflow-hidden text-ellipsis whitespace-nowrap">{{ product.MoTa }}</p>
                                </td>
                                <td class="flex justify-center items-center gap-2 px-7 py-7 flex-col">
                                    <a :href="`/admin/editProduct/${product.MaSach}`"
                                        class="inline-block bg-[#00697F] text-white font-medium py-2 px-4 rounded-md transition-all duration-300 hover:bg-[#055565] whitespace-nowrap">Sửa
                                        sản phẩm</a>
                                    <form @submit.prevent="deleteProduct(product.MaSach)">
                                        <button type="submit"
                                            class="inline-block text-white font-medium bg-[#DC143C] py-2 px-4 mb-4 rounded-md transition-all duration-300 hover:bg-[#B22222] whitespace-nowrap">Xóa
                                            sản phẩm</button>
                                    </form>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <transition name="slide-fade" mode="out-in">
                    <div v-if="notification.message"
                        :class="`fixed top-4 right-4 p-5 bg-white shadow-lg rounded-lg z-10 flex items-center space-x-2 
                        ${notification.type === 'success' ? 'border-l-8 border-green-500 text-green-600' : 'border-l-8 border-red-500 text-red-600'}`">
                        <p class="text-[18px] font-semibold">{{ notification.message }}</p>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.5s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>