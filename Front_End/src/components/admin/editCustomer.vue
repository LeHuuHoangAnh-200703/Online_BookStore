<script setup>
import sidebar from '../../layout/admin/Sidebar.vue';
import navbar from '../../layout/admin/Navbar.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref({
    MaDG: '',
    HoLotDG: '',
    TenDG: '',
    NgaySinhDG: '',
    GioiTinhDG: '',
    DiaChiDG: '',
    DienThoaiDG: '',
    errors: {
        MaDG: '',
        HoLotDG: '',
        TenDG: '',
        NgaySinhDG: '',
        GioiTinhDG: '',
        DiaChiDG: '',
        DienThoaiDG: '',
    }
});

const notification = ref({
    message: "",
    type: ""
});

const fetchCustomerData = async (maDocGia) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/docgia/${maDocGia}`);
        formData.value.MaDG = response.data.MaDocGia;
        formData.value.HoLotDG = response.data.HoLot;
        formData.value.TenDG = response.data.Ten;
        // Chuyển đổi ngày sinh về dạng yyyy-MM-dd
        formData.value.NgaySinhDG = new Date(response.data.NgaySinh).toISOString().slice(0, 10);
        formData.value.GioiTinhDG = response.data.Phai;
        formData.value.DiaChiDG = response.data.DiaChi;
        formData.value.DienThoaiDG = response.data.DienThoai;
    } catch (error) {
        console.error('Error fetching customer data:', error);
    }
};

const submitForm = async () => {
    Object.keys(formData.value.errors).forEach(key => {
        formData.value.errors[key] = '';
    });

    let hasError = false;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    if (!formData.value.HoLotDG) {
        formData.value.errors.HoLotDG = 'Họ lót đọc giả không được để trống!';
        hasError = true;
    }
    if (!formData.value.TenDG) {
        formData.value.errors.TenDG = 'Tên đọc giả không được để trống!';
        hasError = true;
    }
    if (!formData.value.NgaySinhDG) {
        formData.value.errors.NgaySinhDG = 'Ngày sinh đọc giả không được để trống!';
        hasError = true;
    }
    if (!formData.value.GioiTinhDG) {
        formData.value.errors.GioiTinhDG = 'Giới tính đọc giả không được để trống!';
        hasError = true;
    }
    if (!formData.value.DiaChiDG) {
        formData.value.errors.DiaChiDG = 'Địa chỉ đọc giả không được để trống!';
        hasError = true;
    }
    if (!formData.value.DienThoaiDG) {
        formData.value.errors.DienThoaiDG = 'Số điện thoại không được bỏ trống!';
        hasError = true;
    } else if (!phoneRegex.test(formData.value.DienThoaiDG)) {
        formData.value.errors.DienThoaiDG = 'Số điện thoại không đúng định dạng!';
        hasError = true;
    }
    if (hasError) {
        return;
    }

    try {
        const dataSend = {
            MaDocGia: formData.value.MaDG,
            HoLot: formData.value.HoLotDG,
            Ten: formData.value.TenDG,
            NgaySinh: formData.value.NgaySinhDG,
            Phai: formData.value.GioiTinhDG,
            DiaChi: formData.value.DiaChiDG,
            DienThoai: formData.value.DienThoaiDG,
        }
        const response = await axios.put(`http://localhost:5000/api/docgia/${formData.value.MaDG}`, dataSend);

        notification.value = {
            message: 'Đọc giả đã được chỉnh sửa thành công!',
            type: 'success'
        };

        router.push('/admin/Customers');
    } catch (error) {
        notification.value = {
            message: error.response ? error.response.data.message : error.message,
            type: 'error'
        };
    }

    setTimeout(() => {
        notification.value.message = '';
    }, 3000);
};

onMounted(() => {
    const maDocGia = router.currentRoute.value.params.maDocGia;
    console.log(maDocGia);
    fetchCustomerData(maDocGia);
}); 
</script>

<template>
    <div class="flex font-sans">
        <sidebar />
        <div class="flex flex-col w-full">
            <navbar />
            <div class="w-[95%] mx-auto h-[100%] my-5 overflow-hidden">
                <div class="text-center py-4">
                    <h2 class="text-[#333] font-bold text-[20px]">CHỈNH SỬA ĐỌC GIẢ</h2>
                </div>
                <form @submit.prevent="submitForm" action="" method="POST" enctype="multipart/form-data"
                    class="w-full max-h-[calc(100vh-200px)] overflow-y-scroll">
                    <div
                        class="flex flex-col bg-white w-full md:w-[70%] mx-auto gap-5 border-2 rounded-xl shadow-md p-5 m-2">
                        <div class="">
                            <div>
                                <label for="HoLotDG"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Họ
                                    đọc giả</label>
                                <input v-model="formData.HoLotDG" name="HoLotDG" autofocus type="text" id="HoLotDG"
                                    :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed', formData.errors.HoLotDG ? 'input-error' : '']"
                                    placeholder="Nhập họ đọc giả ..." />
                                <p class="text-red-500 text-sm">{{ formData.errors.HoLotDG }}</p>
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="TenDG"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Tên
                                    đọc giả</label>
                                <input v-model="formData.TenDG" name="TenDG" autofocus type="text" id="TenDG"
                                    :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed', formData.errors.TenDG ? 'input-error' : '']"
                                    placeholder="Nhập tên đọc giả ..." />
                                <p class="text-red-500 text-sm">{{ formData.errors.TenDG }}</p>
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="NgaySinhDG"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Ngày
                                    sinh</label>
                                <input v-model="formData.NgaySinhDG" name="NgaySinhDG" autofocus type="date"
                                    id="NgaySinhDG"
                                    :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed', formData.errors.NgaySinhDG ? 'input-error' : '']">
                                <p class="text-red-500 text-sm">{{ formData.errors.NgaySinhDG }}</p>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center w-full">
                            <h2
                                class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">
                                Chọn giới tính</h2>
                            <select v-model="formData.GioiTinhDG" name="GioiTinhDG"
                                :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed', formData.errors.GioiTinhDG ? 'input-error' : '']">
                                <option value="">Chọn giới tính</option>
                                <option checked value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                            <p class="text-red-500 text-sm">{{ formData.errors.GioiTinhDG }}</p>
                        </div>
                        <div class="">
                            <div>
                                <label for="DiaChiDG"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Địa
                                    chỉ</label>
                                <input v-model="formData.DiaChiDG" name="DiaChiDG" autofocus type="text" id="DiaChiDG"
                                    :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed', formData.errors.DiaChiDG ? 'input-error' : '']"
                                    placeholder="Nhập địa chỉ đọc giả ..." />
                                <p class="text-red-500 text-sm">{{ formData.errors.DiaChiDG }}</p>
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="DienThoaiDG"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Số
                                    điện thoại</label>
                                <input v-model="formData.DienThoaiDG" name="DienThoaiDG" autofocus type="text"
                                    id="DienThoaiDG"
                                    :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed', formData.errors.DienThoaiDG ? 'input-error' : '']"
                                    placeholder="Nhập số điện thoại ..." />
                                <p class="text-red-500 text-sm">{{ formData.errors.DienThoaiDG }}</p>
                            </div>
                        </div>
                        <div class="text-center">
                            <button type="submit"
                                class="inline-block rounded-lg bg-[#00697F] px-5 py-2.5 text-sm font-bold text-[#fff] shadow-md hover:scale-110 transition-all duration-200">Thêm
                                đọc giả</button>
                        </div>
                    </div>
                </form>
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

.input-error {
    border: 2px solid red;
}
</style>