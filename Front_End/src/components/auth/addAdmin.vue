<template>
    <div
        class="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-[#00697F] to-[#51A7BF] p-4">
        <div class="w-full max-w-4xl">
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="flex flex-col md:flex-row">
                    <div class="hidden md:block w-1/2 bg-[#51A7BF] p-12">
                        <img src="../../assets/img/img-logout.png" class="w-full h-full object-cover rounded-xl"
                            alt="Login illustration" />
                    </div>
                    <div class="w-full md:w-1/2 p-8 md:p-12">
                        <h1 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
                            Thêm Admin
                        </h1>
                        <p class="text-md md:text-lg font-medium text-center text-gray-600 mb-8">
                            Vui lòng điền thông tin để thêm!
                        </p>
                        <form @submit.prevent="registerAdmin" method="POST" action="" class="space-y-6">
                            <div>
                                <label :class="{ 'text-red-500': errors.name }" for="name"
                                    class="text-sm font-medium text-gray-700 block mb-2">Tên đăng
                                    nhập</label>
                                <input v-model="formData.name" type="name" id="name"
                                    :class="{ 'border-red-500': errors.name }"
                                    class="w-full px-4 py-3 rounded-lg outline-none border-2 border-gray-300 focus:border-[#51A7BF] focus:ring-[#51A7BF] transition duration-150 ease-in-out"
                                    placeholder="JeiKei" />
                                <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
                            </div>
                            <div>
                                <label :class="{ 'text-red-500': errors.position }" for="position"
                                    class="text-sm font-medium text-gray-700 block mb-2">Chức vụ</label>
                                <select v-model="formData.position" id="position"
                                    :class="{ 'border-red-500': errors.position }"
                                    class="w-full px-4 py-3 cursor-pointer rounded-lg outline-none border-2 border-gray-300 focus:border-[#51A7BF] focus:ring-[#51A7BF] transition duration-150 ease-in-out">
                                    <option value="">Chọn chức vụ</option>
                                    <option value="Quản lý sách và nhà xuất bản">Quản lý sách và nhà xuất bản</option>
                                    <option value="Quản lý đọc giả và đơn mượn sách">Quản lý đọc giả và đơn mượn sách</option>
                                </select>
                                <p v-if="errors.position" class="text-red-500 text-sm">{{ errors.position }}</p>
                            </div>
                            <div>
                                <label :class="{ 'text-red-500': errors.address }" for="address"
                                    class="text-sm font-medium text-gray-700 block mb-2">Địa
                                    chỉ</label>
                                <input v-model="formData.address" type="address" id="address"
                                    :class="{ 'border-red-500': errors.address }"
                                    class="w-full px-4 py-3 rounded-lg outline-none border-2 border-gray-300 focus:border-[#51A7BF] focus:ring-[#51A7BF] transition duration-150 ease-in-out"
                                    placeholder="Long Mỹ - Hậu Giang" />
                                <p v-if="errors.address" class="text-red-500 text-sm">{{ errors.address }}</p>
                            </div>
                            <div>
                                <label :class="{ 'text-red-500': errors.phone }" for="phone"
                                    class="text-sm font-medium text-gray-700 block mb-2">Số điện
                                    thoại</label>
                                <input v-model="formData.phone" type="phone" id="phone"
                                    :class="{ 'border-red-500': errors.phone }"
                                    class="w-full px-4 py-3 rounded-lg outline-none border-2 border-gray-300 focus:border-[#51A7BF] focus:ring-[#51A7BF] transition duration-150 ease-in-out"
                                    placeholder="079-xxx-xxxx" />
                                <p v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</p>
                            </div>
                            <div>
                                <label :class="{ 'text-red-500': errors.password }" for="password"
                                    class="text-sm font-medium text-gray-700 block mb-2">Mật
                                    Khẩu</label>
                                <input v-model="formData.password" type="password" id="password"
                                    :class="{ 'border-red-500': errors.password }"
                                    class="w-full px-4 py-3 outline-none rounded-lg border-2 border-gray-300 focus:border-[#51A7BF] focus:ring-[#51A7BF] transition duration-150 ease-in-out"
                                    placeholder="••••••••" />
                                <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
                            </div>
                            <button type="submit"
                                class="w-full bg-[#51A7BF] text-white rounded-lg py-3 px-4 font-semibold hover:bg-[#00697F] transition duration-300 ease-in-out transform hover:scale-105">
                                Đăng Ký
                            </button>
                        </form>
                        <p class="mt-8 text-center text-sm text-gray-600">
                            Nếu đã có tài khoản?
                            <router-link to="/admin/login"
                                class="font-medium text-[#00697F] hover:text-[#51A7BF] transition duration-150 ease-in-out">Đăng
                                nhập</router-link>
                        </p>
                    </div>
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
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const errors = ref({});
const formData = ref({
    name: '',
    password: '',
    position: '',
    phone: '',
    address: ''
});

const notification = ref({
    message: '',
    type: ''
});

const registerAdmin = async () => {
    errors.value = {};
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    if (!formData.value.name) {
        errors.value.name = 'Tên đăng nhập không được bỏ trống';
    }
    if (!formData.value.position) {
        errors.value.position = 'Chức vụ không được bỏ trống';
    }
    if (!formData.value.address) {
        errors.value.address = 'Địa chỉ không được bỏ trống';
    }
    if (!formData.value.phone) {
        errors.value.phone = 'Số điện thoại không được bỏ trống';
    } else if (!phoneRegex.test(formData.value.phone)) {
        errors.value.phone = 'Số điện thoại không đúng định dạng.';
    }
    if (!formData.value.password) {
        errors.value.password = 'Mật khẩu không được bỏ trống';
    } else if (formData.value.password.length < 6) {
        errors.value.password = 'Mật khẩu phải từ 6 ký tự trở lên';
    }

    if (Object.keys(errors.value).length > 0) {
        return;
    }

    try {
        const dataToSend = {
            HoTenNV: formData.value.name,
            Password: formData.value.password,
            ChucVu: formData.value.position,
            DiaChi: formData.value.address,
            DienThoai: formData.value.phone,
        };

        const response = await axios.post('http://localhost:5000/api/nhanvien', dataToSend);
        notification.value = {
            message: 'Thêm nhân viên thành công!',
            type: 'success'
        };
        setTimeout(() => {
            router.push('/admin/login');
        }, 3000);

    } catch (error) {
        notification.value = {
            message: error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.',
            type: 'error'
        };
    }

    setTimeout(() => {
        notification.value.message = '';
    }, 3000);
};
</script>

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