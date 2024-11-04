<script setup>
import sidebar from '../../layout/admin/Sidebar.vue';
import navbar from '../../layout/admin/Navbar.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref({
    MaNV: '',
    HoTenNV: '',
    Password: '',
    ConfirmPassword: '',
    ChucVu: '',
    DienThoai: '',
    DiaChi: '',
    errors: {
        HoTenNV: '',
        Password: '',
        ConfirmPassword: '',
        ChucVu: '',
        DienThoai: '',
        DiaChi: ''
    }
});

const notification = ref({
    message: "",
    type: ""
});

const fetchStaffData = async (maNV) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/nhanvien/${maNV}`);
        formData.value.MaNV = response.data.MSNV;
        formData.value.HoTenNV = response.data.HoTenNV;
        formData.value.ChucVu = response.data.ChucVu;
        formData.value.DiaChi = response.data.DiaChi;
        formData.value.DienThoai = response.data.DienThoai;
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching staff data:', error);
    }
};

const submitForm = async () => {
    Object.keys(formData.value.errors).forEach(key => {
        formData.value.errors[key] = '';
    });

    let hasError = false;

    if (formData.value.Password || formData.value.ConfirmPassword) {
        if (formData.value.Password !== formData.value.ConfirmPassword) {
            formData.value.errors.ConfirmPassword = 'Mật khẩu xác nhận không khớp!';
            hasError = true;
        }
    }

    if (!formData.value.HoTenNV) {
        formData.value.errors.HoTenNV = 'Họ tên không được để trống!';
        hasError = true;
    }

    if (!formData.value.ChucVu) {
        formData.value.errors.ChucVu = 'Chức vụ không được để trống!';
        hasError = true;
    }

    if (!formData.value.DiaChi) {
        formData.value.errors.DiaChi = 'Địa chỉ không được để trống!';
        hasError = true;
    }

    if (!formData.value.DienThoai) {
        formData.value.errors.DienThoai = 'Điện thoại không được để trống!';
        hasError = true;
    }

    if (hasError) {
        return;
    }

    try {
        const dataSend = {
            MaNV: formData.value.MaNV,
            HoTenNV: formData.value.HoTenNV,
            ChucVu: formData.value.ChucVu,
            DiaChi: formData.value.DiaChi,
            DienThoai: formData.value.DienThoai,
        };

        if (formData.value.Password) {
            dataSend.Password = formData.value.Password;
        }

        const response = await axios.put(`http://localhost:5000/api/nhanvien/${formData.value.MaNV}`, dataSend);

        notification.value = {
            message: 'Thông tin nhân viên đã được cập nhật thành công!',
            type: 'success'
        };

        router.push('/admin/staffList');
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
    const maNV = router.currentRoute.value.params.maNhanVien;
    console.log(maNV);
    fetchStaffData(maNV);
}); 
</script>

<template>
    <div class="flex font-sans">
        <sidebar />
        <div class="flex flex-col w-full">
            <navbar />
            <div class="relative flex flex-col gap-4 w-full overflow-auto max-h-[calc(100vh-150px)]">
                <div class="flex-grow lg:py-8 lg:px-24 p-4">
                    <div class="container max-w-screen-lg mx-auto">
                        <div>
                            <div class="bg-white rounded-lg border-2 shadow-lg p-4 px-4 md:p-8 mb-6">
                                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                    <div class="text-[#333f48] font-semibold">
                                        <p class="text-lg">Chỉnh sửa thông tin nhân viên</p>
                                        <p class="text-[#00697F]">Vui lòng điền thông tin đầy đủ.</p>
                                    </div>
                                    <div class="lg:col-span-2">
                                        <form @submit.prevent="submitForm" action="" method="POST"
                                            class="grid gap-4 gap-y-3 text-sm grid-cols-1 md:grid-cols-5"
                                            enctype="multipart/form-data">
                                            <div class="md:col-span-5">
                                                <label :class="{ 'text-red-500': formData.errors.HoTenNV }" for="HoTenNV" class="font-semibold text-[16px]">Họ tên nhân viên</label>
                                                <input v-model="formData.HoTenNV" type="text" name="HoTenNV"
                                                    :class="{ 'border-red-500': formData.errors.HoTenNV }"
                                                    id="HoTenNV" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    placeholder="Nhập họ tên nhân viên ..." />
                                                <p v-if="formData.errors.HoTenNV" class="text-red-500 mt-1">{{ formData.errors.HoTenNV }}</p>
                                            </div>

                                            <div class="md:col-span-5">
                                                <label :class="{ 'text-red-500': formData.errors.Password }" for="Password" class="font-semibold text-[16px]">Mật khẩu mới của
                                                    tài
                                                    khoản</label>
                                                <input v-model="formData.Password" type="text" name="Password"
                                                    id="Password"
                                                    :class="{ 'border-red-500': formData.errors.Password }"
                                                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    placeholder="Nhập mật khẩu tài khoản ..." />
                                                <p v-if="formData.errors.Password" class="text-red-500 mt-1">{{ formData.errors.Password }}</p>
                                            </div>

                                            <div class="md:col-span-5">
                                                <label :class="{ 'text-red-500': formData.errors.ConfirmPassword }" for="ConfirmPassword" class="font-semibold text-[16px]">Xác nhận
                                                    mật khẩu mới</label>
                                                <input v-model="formData.ConfirmPassword" type="text"
                                                    name="ConfirmPassword" id="confirmPassword"
                                                    :class="{ 'border-red-500': formData.errors.ConfirmPassword }"
                                                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    placeholder="Nhập lại mật khẩu mới ..." />
                                                <p v-if="formData.errors.Password" class="text-red-500 mt-1">{{ formData.errors.Password }}</p>
                                            </div>

                                            <div class="md:col-span-5">
                                                <label :class="{ 'text-red-500': formData.errors.ChucVu }" for="ChucVu" class="font-semibold text-[16px]">Chức vụ</label>
                                                <select v-model="formData.ChucVu" id="ChucVu"
                                                    :class="{ 'border-red-500': formData.errors.ChucVu }"
                                                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                                                    <option value="">Chọn chức vụ phù hợp</option>
                                                    <option value="Quản trị viên">Quản trị viên</option>
                                                    <option value="Nhân viên">Nhân viên</option>
                                                </select>
                                                <p v-if="formData.errors.ChucVu" class="text-red-500 mt-1">{{ formData.errors.ChucVu }}</p>
                                            </div>

                                            <div class="md:col-span-5">
                                                <label for="DiaChi" :class="{ 'text-red-500': formData.errors.DiaChi }" class="font-semibold text-[16px]">Địa chỉ</label>
                                                <input v-model="formData.DiaChi" type="text" name="DiaChi" id="DiaChi"
                                                    :class="{ 'border-red-500': formData.errors.DiaChi }"
                                                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    placeholder="Nhập địa chỉ ..." />
                                                <p v-if="formData.errors.DiaChi" class="text-red-500 mt-1">{{ formData.errors.DiaChi }}</p>
                                            </div>

                                            <div class="md:col-span-5">
                                                <label for="DienThoai" :class="{ 'text-red-500': formData.errors.DienThoai }" class="font-semibold text-[16px]">Điện
                                                    thoại</label>
                                                <input v-model="formData.DienThoai" type="text" name="DienThoai"
                                                    id="DienThoai"
                                                    :class="{ 'border-red-500': formData.errors.DienThoai }"
                                                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    placeholder="Nhập điện thoại ..." />
                                                <p v-if="formData.errors.DienThoai" class="text-red-500 mt-1">{{ formData.errors.DienThoai }}</p>
                                            </div>

                                            <div class="md:col-span-5 text-right">
                                                <div class="inline-flex items-end">
                                                    <button type="submit"
                                                        class="bg-[#333f48] hover:bg-[#00697F] text-white font-bold py-2 px-4 rounded">Cập
                                                        nhật
                                                        thông tin</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
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