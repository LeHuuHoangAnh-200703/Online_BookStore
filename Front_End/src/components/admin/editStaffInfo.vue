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
    ChucVu: '',
    DienThoai: '',
    DiaChi: '',
    errors: {
        HoTenNV: '',
        Password: '',
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
        formData.value.Password = response.data.Password;
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

    if (!formData.value.TenNXB) {
        formData.value.errors.TenNXB = 'Tên nhà xuất bản không được để trống!';
        hasError = true;
    }
    if (!formData.value.DiaChiNXB) {
        formData.value.errors.DiaChiNXB = 'Địa chỉ nhà xuất bản không được để trống!';
        hasError = true;
    }
    if (hasError) {
        return;
    }

    try {
        const dataSend = {
            MaNXB: formData.value.idNXB,
            TenNXB: formData.value.TenNXB,
            DiaChi: formData.value.DiaChiNXB,
        }
        const response = await axios.put(`http://localhost:5000/api/nhaxuatban/${formData.value.idNXB}`, dataSend);

        notification.value = {
            message: 'Nhà xuất bản đã được chỉnh sửa thành công!',
            type: 'success'
        };

        router.push('/admin/NXBLists');
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
            <div class="flex flex-col gap-4 w-full overflow-auto max-h-[calc(100vh-150px)]">
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
                                        <form action="" method="POST"
                                            class="grid gap-4 gap-y-3 text-sm grid-cols-1 md:grid-cols-5"
                                            enctype="multipart/form-data">
                                            <div class="md:col-span-5">
                                                <label for="HoTenNV" class="font-semibold text-[16px]">Họ tên nhân
                                                    viên</label>
                                                <input v-model="formData.HoTenNV" type="text" name="HoTenNV"
                                                    id="HoTenNV" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    placeholder="Nhập họ tên nhân viên ..." />
                                            </div>

                                            <div class="md:col-span-5">
                                                <label for="Password" class="font-semibold text-[16px]">Mật khẩu tài
                                                    khoản</label>
                                                <input v-model="formData.Password" type="text" name="Password"
                                                    id="Password"
                                                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    placeholder="Nhập mật khẩu tài khoản ..." />
                                            </div>

                                            <div class="md:col-span-5">
                                                <select v-model="formData.ChucVu" id="ChucVu"
                                                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                                                    <option value="">Chọn chức vụ</option>
                                                    <option value="Quản lý sách và nhà xuất bản">Quản lý sách và nhà
                                                        xuất bản</option>
                                                    <option value="Quản lý đọc giả và đơn mượn sách">Quản lý đọc giả và
                                                        đơn mượn sách</option>
                                                </select>
                                            </div>

                                            <div class="md:col-span-5">
                                                <label for="DiaChi" class="font-semibold text-[16px]">Địa chỉ</label>
                                                <input v-model="formData.DiaChi" type="text" name="DiaChi" id="DiaChi"
                                                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    placeholder="Nhập địa chỉ ..." />
                                            </div>

                                            <div class="md:col-span-5">
                                                <label for="DienThoai" class="font-semibold text-[16px]">Điện
                                                    thoại</label>
                                                <input v-model="formData.DienThoai" type="text" name="DienThoai"
                                                    id="DienThoai"
                                                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    placeholder="Nhập điện thoại ..." />
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