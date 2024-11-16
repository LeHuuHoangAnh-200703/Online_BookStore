<script setup>
import sidebar from '../../layout/admin/Sidebar.vue';
import navbar from '../../layout/admin/Navbar.vue';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const orders = ref([]);
const searchQuery = ref("");
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


// const deleteOrders = async (id) => {
//     const confirmDelete = confirm("Bạn có chắc chắn muốn xóa thông tin này không?");
//     if (!confirmDelete) return;

//     try {
//         await axios.delete(`http://localhost:5000/api/theodoimuonsach/${id}`);
//         orders.value = orders.value.filter(order => order._id !== id);
//         notification.value = {
//             message: 'Thông tin mượn sách đã được xóa thành công!',
//             type: 'success'
//         };
//     } catch (error) {
//         console.error('Error deleting publishingHouse:', error);
//         notification.value = {
//             message: 'Có lỗi xảy ra, vui lòng thử lại!',
//             type: 'error'
//         };
//     }
//     setTimeout(() => {
//         notification.value.message = '';
//     }, 3000);
// };

const updateOrderStatus = async (id) => {
    const confirmDelete = confirm("Bạn có chắc chắn về việc cập nhật này không?");
    if (!confirmDelete) return;
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

const approveOrder = async (id) => {
    const confirmApprove = confirm("Bạn có chắc chắn muốn duyệt yêu cầu này không?");
    if (!confirmApprove) return;

    try {
        const response = await axios.patch(`http://localhost:5000/api/theodoimuonsach/approve/${id}`);
        const orderToUpdate = orders.value.find(order => order._id === id);
        if (orderToUpdate) {
            orderToUpdate.TrangThaiDuyet = response.data.TrangThaiDuyet;
        }
        notification.value = {
            message: 'Yêu cầu đã được duyệt thành công!',
            type: 'success'
        };
    } catch (error) {
        console.error('Error approving order:', error);
        notification.value = {
            message: 'Có lỗi xảy ra khi duyệt yêu cầu!',
            type: 'error'
        };
    }
    setTimeout(() => {
        notification.value.message = '';
    }, 3000);
};

const filteredCustomers = computed(() => {
    if (!searchQuery.value) {
        return orders.value;
    }
    return orders.value.filter(order =>
        order.MaDocGia.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const formatCurrency = (value) => {
    const formattedValue = value * 1000;
    return formattedValue.toLocaleString('vi-VN') + ' ' + 'VNĐ';
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
            <div class="relative w-[100%] mx-auto h-[100%] overflow-hidden bg-[#e8e8e8]">
                <div class="text-center py-4">
                    <h2 class="text-[#333] font-bold text-[20px]">THEO DÕI MƯỢN SÁCH</h2>
                </div>
                <div class="text-center mb-4">
                    <input type="text" v-model="searchQuery" placeholder="Tìm kiếm đơn theo mã đọc giả ..."
                        class="border-2 rounded-md border-[#00697F] outline-none px-4 py-3 text-base w-1/3" />
                </div>
                <div id="" class="overflow-y-auto max-h-[calc(100vh-200px)]">
                    <div class="bg-white w-[95%] mx-auto p-5 shadow-md rounded-xl mb-6" v-for="order in filteredCustomers" :key="order._id">
                        <div class="flex flex-col lg:flex-row items-center justify-center lg:justify-between py-2">
                            <p class="font-bold lg:text-xl text-[14px] uppercase text-[#00697F]">
                                <i class="fa-solid fa-book"></i> - JEIKEI LIBRARY
                            </p>
                            <p class="text-[#DC143C] lg:text-xl text-[14px] font-semibold">
                                <i class="fa-brands fa-slack"></i> {{ order.TrangThaiDuyet }}
                            </p>
                        </div>
                        <hr class="bg-[#00697F] my-2" />
                        <div class="flex lg:flex-row flex-col lg:gap-2 gap-4  p-3 items-center justify-center">
                            <div class="flex flex-col gap-2 w-full">
                                <p class="text-[18px] font-semibold">Mã đọc giả: <span class="text-[#00697F]">{{
                                    order.MaDocGia }}</span></p>
                                <p class="text-[18px] font-semibold">Mã sách: <span class="text-[#00697F]">{{
                                    order.MaSach }}</span></p>
                                <p class="text-[18px] font-semibold">Tổng tiền: <span class="text-[#00697F]">{{
                                    formatCurrency(order.TongTien) }}</span></p>
                                <p class="text-[18px] font-semibold">
                                    Ngày mượn:
                                    <span class="text-[#00697F] font-semibold">{{ order.NgayMuon
                                        }}</span>
                                </p>
                                <div class="flex lg:flex-row flex-col gap-2 lg:justify-between">
                                    <p class="text-[18px] font-semibold">
                                        Ngày trả:
                                        <span class="font-semibold text-[#00697F]">{{ order.NgayTra
                                            }}</span>
                                    </p>
                                    <p class="text-[18px] font-semibold">Số lượng: <span class="text-[#00697F]">{{
                                        order.SoLuong }}</span>
                                    </p>
                                </div>
                                <p class="text-[18px] font-semibold">
                                    Trạng thái:
                                    <span class="font-semibold text-[#DC143C]">{{ order.TrangThai }}</span>
                                </p>
                            </div>
                        </div>
                        <hr class="bg-[#00697F] my-2" />
                        <p class="text-[18px] font-semibold lg:py-2 py-4">Lưu ý: <span class="text-[#DC143C]">Chỉ có thể
                                hủy yêu cầu
                                mượn khi chưa được duyệt!</span></p>
                        <div class="flex gap-4 justify-center lg:justify-end">
                            <!-- <form @submit.prevent="deleteOrders(order._id)" class="form-inline ml-1">
                                <button type="submit"
                                    class="text-primary-700 bg-[#DC143C] px-[14px] py-2 text-[#fff] hover:bg-[#b41c3a] transition-all duration-300">
                                    <i alt="Delete"></i> Xóa thông tin
                                </button>
                            </form> -->
                            <button @click.prevent="approveOrder(order._id)" v-if="order.TrangThaiDuyet !== 'Đã duyệt'"
                                class="bg-[#00697F] text-white px-4 py-2 transition-all duration-300">
                                Duyệt yêu cầu
                            </button>
                            <button @click="updateOrderStatus(order._id)" v-if="order.TrangThai !== 'Đã trả'"
                                class="bg-[#4169E1] text-white px-4 py-2 hover:bg-[#2f53bf] transition-all duration-300">
                                Cập nhật trạng thái
                            </button>
                        </div>
                    </div>
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