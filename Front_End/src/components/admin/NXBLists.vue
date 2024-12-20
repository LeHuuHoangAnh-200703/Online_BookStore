<script setup>
import sidebar from '../../layout/admin/Sidebar.vue';
import navbar from '../../layout/admin/Navbar.vue';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const publishingHouses = ref([]);
const searchQuery = ref("");
const notification = ref({
    message: "",
    type: ""
});
const fetchPublishingHouses = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/nhaxuatban');
        publishingHouses.value = response.data.map(publishingHouse => {
            return {
                ...publishingHouse
            };
        });
    } catch (error) {
        console.error('Error fetching readers:', error);
    }
};


const deletePublishingHouse = async (maNXB) => {
    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa nhà xuất bản này không?");
    if (!confirmDelete) return;

    try {
        await axios.delete(`http://localhost:5000/api/nhaxuatban/${maNXB}`);
        publishingHouses.value = publishingHouses.value.filter(publishingHouse => publishingHouse.MaNXB !== maNXB);
        notification.value = {
            message: 'Nhà xuất bản đã được xóa thành công!',
            type: 'success'
        };
    } catch (error) {
        notification.value = {
            message: error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!',
            type: 'error'
        };
    }
    setTimeout(() => {
        notification.value.message = '';
    }, 3000);
};

const filteredPublishingHouses = computed(() => {
    if (!searchQuery.value) {
        return publishingHouses.value;
    }
    return publishingHouses.value.filter(publishingHouse =>
        publishingHouse.TenNXB.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

onMounted(() => {
    fetchPublishingHouses();
});
</script>

<template>
    <div class="flex font-sans">
        <sidebar />
        <div class="flex flex-col w-full overflow-auto">
            <navbar />
            <div class="relative w-[95%] mx-auto h-[100%] overflow-hidden">
                <div class="text-center py-4">
                    <h2 class="text-[#333] font-bold text-[20px]">DANH SÁCH NHÀ XUẤT BẢN</h2>
                </div>
                <div class="text-center mb-4">
                    <input type="text" v-model="searchQuery" placeholder="Tìm kiếm nhà xuất bản theo tên ..."
                        class="border-2 rounded-md border-[#00697F] outline-none px-4 py-3 text-base w-1/3" />
                </div>
                <div id="" class="overflow-y-auto max-h-[calc(100vh-200px)]">
                    <table
                        class="w-full rounded-lg border-2 border-[#cecece] bg-white text-center text-sm text-gray-500">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Mã nhà xuất bản</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Tên nhà xuất bản</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Địa chỉ</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Điều chỉnh</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 bg-white border-t border-[#cecece]">
                            <tr v-for="publishingHouse in filteredPublishingHouses" :key="publishingHouse._id">
                                <th class="px-6 py-4 font-medium text-gray-900">{{ publishingHouse.MaNXB }}</th>
                                <td class="px-6 py-4 whitespace-nowrap">{{ publishingHouse.TenNXB }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ publishingHouse.DiaChi }}</td>
                                <td class="flex justify-center gap-4 px-6 py-4 font-medium whitespace-nowrap">
                                    <a :href="`/admin/editNXB/${publishingHouse.MaNXB}`"
                                        class="inline-block bg-[#00697F] text-white font-medium py-2 px-4 transition-all duration-300 hover:bg-[#055565] whitespace-nowrap">Sửa
                                        nhà xuất bản</a>
                                    <form @submit.prevent="deletePublishingHouse(publishingHouse.MaNXB)" class="form-inline ml-1">
                                        <button type="submit"
                                            class="text-primary-700 bg-[#DC143C] px-[14px] py-2 text-[#fff]"
                                            >
                                            <i alt="Delete"></i> Xóa nhà xuất bản
                                        </button>
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