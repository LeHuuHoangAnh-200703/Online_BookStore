<script setup>
import sidebar from '../../layout/admin/Sidebar.vue';
import navbar from '../../layout/admin/Navbar.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const orders = ref([]);
const today = new Date();
const notification = ref({
    message: "",
    type: ""
});
const fetchOrders = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/theodoimuonsach');
        orders.value = response.data.map(order => {
            let status = order.TrangThai;
            if (status !== 'Đã trả') {
                const ngayTra = new Date(order.NgayTra);
                status = ngayTra < today ? 'Quá hạn' : 'Chưa trả';
            }
            return {
                ...order,
                NgayMuon: new Date(order.NgayMuon).toLocaleDateString('vi-VN'),
                NgayTra: new Date(order.NgayTra).toLocaleDateString('vi-VN'),
                TrangThai: status
            };
        });
    } catch (error) {
        console.error('Error fetching readers:', error);
    }
};


const deleteOrders = async (id) => {
    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa thông tin này không?");
    if (!confirmDelete) return;

    try {
        await axios.delete(`http://localhost:5000/api/theodoimuonsach/${id}`);
        orders.value = orders.value.filter(order => order._id !== id);
        notification.value = {
            message: 'Thông tin mượn sách đã được xóa thành công!',
            type: 'success'
        };
    } catch (error) {
        console.error('Error deleting publishingHouse:', error);
        notification.value = {
            message: 'Có lỗi xảy ra, vui lòng thử lại!',
            type: 'error'
        };
    }
    setTimeout(() => {
        notification.value.message = '';
    }, 3000);
};

const updateOrderStatus = async (id) => {
    try {
        await axios.patch(`http://localhost:5000/api/theodoimuonsach/${id}`, { TrangThai: 'Đã trả' });
        const orderToUpdate = orders.value.find(order => order._id === id);
        if (orderToUpdate) {
            orderToUpdate.TrangThai = 'Đã trả';
        }
        notification.value = {
            message: 'Trạng thái đã được cập nhật thành công!',
            type: 'success'
        };
    } catch (error) {
        console.error('Error updating order status:', error);
        notification.value = {
            message: 'Có lỗi xảy ra khi cập nhật trạng thái!',
            type: 'error'
        };
    }
    setTimeout(() => {
        notification.value.message = '';
    }, 3000);
};

onMounted(() => {
    fetchOrders();
});
</script>

<template>
    <div class="flex font-sans">
        <sidebar />
        <div class="flex flex-col w-full overflow-auto">
            <navbar />
            <div class="relative w-[95%] mx-auto h-[100%] overflow-hidden">
                <div class="text-center py-4">
                    <h2 class="text-[#333] font-bold text-[20px]">THEO DÕI MƯỢN SÁCH</h2>
                </div>
                <div id="" class="overflow-y-auto max-h-[calc(100vh-200px)]">
                    <table
                        class="w-full rounded-lg border-2 border-[#cecece] bg-white text-center text-sm text-gray-500">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Mã đọc giả</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Mã sách</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Ngày mượn</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Ngày trả</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Trạng thái</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Điều chỉnh</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 bg-white border-t border-[#cecece]">
                            <tr v-for="order in orders" :key="order._id">
                                <th class="px-6 py-4 font-medium text-gray-900">{{ order.MaDocGia }}</th>
                                <td class="px-6 py-4 whitespace-nowrap">{{ order.MaSach }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ order.NgayMuon }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ order.NgayTra }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ order.TrangThai }}</td>
                                <td class="flex justify-center gap-4 px-6 py-4 font-medium whitespace-nowrap">
                                    <a :href="`/admin/editOrderBook/${order._id}`"
                                        class="inline-block bg-[#00697F] text-white font-medium py-2 px-4 transition-all duration-300 hover:bg-[#055565] whitespace-nowrap">Sửa
                                        thông tin</a>
                                    <form @submit.prevent="deleteOrders(order._id)" class="form-inline ml-1">
                                        <button type="submit"
                                            class="text-primary-700 bg-[#DC143C] px-[14px] py-2 text-[#fff] hover:bg-[#b41c3a] transition-all duration-300">
                                            <i alt="Delete"></i> Xóa thông tin
                                        </button>
                                    </form>
                                    <button @click="updateOrderStatus(order._id)" v-if="order.TrangThai !== 'Đã trả'"
                                        class="bg-[#4169E1] text-white px-4 py-2 hover:bg-[#2f53bf] transition-all duration-300">
                                        Cập nhật trạng thái
                                    </button>
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