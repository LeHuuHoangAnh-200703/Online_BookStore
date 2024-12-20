<script setup>
import sidebar from '../../layout/admin/Sidebar.vue';
import navbar from '../../layout/admin/Navbar.vue';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const staffs = ref([]);
const searchQuery = ref("");
const notification = ref({
    message: "",
    type: ""
});
const fetchStaffs = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/nhanvien');
        staffs.value = response.data.map(staff => {
            return {
                ...staff
            };
        });
    } catch (error) {
        console.error('Error fetching readers:', error);
    }
};


const deleteStaff = async (maNhanVien) => {
    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa nhân viên này không?");
    if (!confirmDelete) return;

    try {
        await axios.delete(`http://localhost:5000/api/nhanvien/${maNhanVien}`);
        staffs.value = staffs.value.filter(staff => staff.MSNV !== maNhanVien);
        notification.value = {
            message: 'Nhân viên đã được xóa thành công!',
            type: 'success'
        };
    } catch (error) {
        console.error('Error deleting reader:', error);
        notification.value = {
            message: 'Có lỗi xảy ra, vui lòng thử lại!',
            type: 'error'
        };
    }
    setTimeout(() => {
        notification.value.message = '';
    }, 3000);
};

const filteredStaffs = computed(() => {
    if (!searchQuery.value) {
        return staffs.value;
    }
    return staffs.value.filter(staff =>
        staff.HoTenNV.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

onMounted(() => {
    fetchStaffs();
});
</script>

<template>
    <div class="flex font-sans">
        <sidebar />
        <div class="flex flex-col w-full overflow-auto">
            <navbar />
            <div class="relative w-[95%] mx-auto h-[100%] overflow-hidden">
                <div class="text-center py-4">
                    <h2 class="text-[#333] font-bold text-[20px]">DANH SÁCH NHÂN VIÊN</h2>
                </div>
                <div class="text-center mb-4">
                    <input type="text" v-model="searchQuery" placeholder="Tìm kiếm nhân viên theo tên ..."
                        class="border-2 rounded-md border-[#00697F] outline-none px-4 py-3 text-base w-1/3" />
                </div>
                <div id="" class="overflow-y-auto max-h-[calc(100vh-200px)]">
                    <table
                        class="w-full rounded-lg border-2 border-[#cecece] bg-white text-center text-sm text-gray-500">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Mã nhân viên</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Tên nhân viên</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Chức vụ</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Địa chỉ</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Số điện thoại</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Điều chỉnh</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 bg-white border-t border-[#cecece]">
                            <tr v-for="staff in filteredStaffs" :key="staff._id">
                                <th class="px-6 py-4 font-medium text-gray-900">{{ staff.MSNV }}</th>
                                <td class="px-6 py-4 whitespace-nowrap">{{ staff.HoTenNV }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ staff.ChucVu }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ staff.DienThoai }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ staff.DiaChi }}</td>
                                <td class="flex justify-center gap-4 px-6 py-4 font-medium whitespace-nowrap">
                                    <a :href="`/admin/editStaffInfo/${ staff.MSNV }`"
                                        class="inline-block bg-[#00697F] text-white font-medium py-2 px-4 transition-all duration-300 hover:bg-[#055565] whitespace-nowrap">Sửa
                                        nhân viên</a>
                                    <form @submit.prevent="deleteStaff(staff.MSNV)" class="form-inline ml-1">
                                        <button type="submit"
                                            class="text-primary-700 bg-[#DC143C] px-[14px] py-2 text-[#fff]"
                                            >
                                            <i alt="Delete"></i> Xóa nhân viên
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