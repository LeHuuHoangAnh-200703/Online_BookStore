<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Header from "../../layout/client/Header.vue";
import Footer from "../../layout/client/Footer.vue";

const router = useRouter();
const HoLot = ref("");
const TenDocGia = ref("");
const NgaySinh = ref("");
const DiaChi = ref("");
const DienThoai = ref("");
const Phai = ref("");
const MaDocGia = ref("");
const formData = ref({
    errors: {
        HoLotDG: '',
        TenDG: '',
        NgaySinhDG: '',
        GioiTinhDG: '',
        DiaChiDG: '',
        DienThoaiDG: ''
    }
});

const notification = ref({
    message: '',
    type: ''
});
const getDocGiaById = async (maDocGia) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/docgia/${maDocGia}`);
        MaDocGia.value = response.data.MaDocGia;
        HoLot.value = response.data.HoLot;
        TenDocGia.value = response.data.Ten;
        NgaySinh.value = new Date(response.data.NgaySinh).toISOString().slice(0, 10);
        Phai.value = response.data.Phai;
        DiaChi.value = response.data.DiaChi;
        DienThoai.value = response.data.DienThoai;
    } catch (error) {
        console.error('Error fetching customer data:', error);
    }
};

const updateInfo = async () => {
    Object.keys(formData.value.errors).forEach(key => {
        formData.value.errors[key] = '';
    });

    let hasError = false;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    if (!HoLot.value) {
        formData.value.errors.HoLotDG = 'Họ lót đọc giả không được để trống!';
        hasError = true;
    }
    if (!TenDocGia.value) {
        formData.value.errors.TenDG = 'Tên đọc giả không được để trống!';
        hasError = true;
    }
    if (!NgaySinh.value) {
        formData.value.errors.NgaySinhDG = 'Ngày sinh đọc giả không được để trống!';
        hasError = true;
    }
    if (!Phai.value) {
        formData.value.errors.GioiTinhDG = 'Giới tính đọc giả không được để trống!';
        hasError = true;
    }
    if (!DiaChi.value) {
        formData.value.errors.DiaChiDG = 'Địa chỉ đọc giả không được để trống!';
        hasError = true;
    }
    if (!DienThoai.value) {
        formData.value.errors.DienThoaiDG = 'Số điện thoại không được bỏ trống!';
        hasError = true;
    } else if (!phoneRegex.test(DienThoai.value)) {
        formData.value.errors.DienThoaiDG = 'Số điện thoại không đúng định dạng!';
        hasError = true;
    }
    if (hasError) {
        return;
    }

    try {
        const dataSend = {
            MaDocGia: MaDocGia.value,
            HoLot: HoLot.value,
            Ten: TenDocGia.value,
            NgaySinh: NgaySinh.value,
            Phai: Phai.value,
            DiaChi: DiaChi.value,
            DienThoai: DienThoai.value,
        }
        const response = await axios.put(`http://localhost:5000/api/docgia/${MaDocGia.value}`, dataSend);

        localStorage.setItem('MaDocGia', MaDocGia.value);
        localStorage.setItem('HoLot', HoLot.value);
        localStorage.setItem('Ten', TenDocGia.value);
        localStorage.setItem('DienThoai', DienThoai.value);
        notification.value = {
            message: 'Cập nhật thông tin thành công!',
            type: 'success'
        };

        setTimeout(() => {
            router.push(`/profile/${MaDocGia.value}`);
        }, 2000);

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
    getDocGiaById(maDocGia);
}); 
</script>
<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <div class="relative flex-grow lg:py-10 lg:px-24 p-4 bg-[#e8e8e8]">
            <div class="container max-w-screen-lg mx-auto">
                <div>
                    <div class="bg-white rounded-lg shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div class="text-[#333f48] font-semibold">
                                <p class="text-lg">Chỉnh sửa thông tin cá nhân</p>
                                <p>Vui lòng điền thông tin đầy đủ.</p>
                            </div>
                            <div class="lg:col-span-2">
                                <form action="" @submit.prevent="updateInfo" method="POST"
                                    class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
                                    enctype="multipart/form-data">
                                    <div class="md:col-span-5">
                                        <label for="HoLot" class="font-semibold text-[16px]">Họ lót</label>
                                        <input type="text" v-model="HoLot" name="HoLot" id="HoLot"
                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="Nhập họ lót ..." />
                                        <p class="text-red-500 text-sm">{{ formData.errors.HoLotDG }}</p>
                                    </div>

                                    <div class="md:col-span-5">
                                        <label for="TenDocGia" class="font-semibold text-[16px]">Tên đọc giả</label>
                                        <input type="text" v-model="TenDocGia" name="TenDocGia" id="TenDocGia"
                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="Nhập tên ..." />
                                        <p class="text-red-500 text-sm">{{ formData.errors.TenDG }}</p>
                                    </div>

                                    <div class="md:col-span-5">
                                        <label for="NgaySinh" class="font-semibold text-[16px]">Ngày sinh</label>
                                        <input type="date" v-model="NgaySinh" name="NgaySinh" id="NgaySinh"
                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        <p class="text-red-500 text-sm">{{ formData.errors.NgaySinhDG }}</p>
                                    </div>

                                    <div class="md:col-span-5">
                                        <label for="Phai" class="font-semibold text-[16px]">Phái</label>
                                        <select name="Phai" id="Phai" v-model="Phai"
                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                                            <option value="">Chọn phái</option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                        <p class="text-red-500 text-sm">{{ formData.errors.GioiTinhDG }}</p>
                                    </div>

                                    <div class="md:col-span-3">
                                        <label for="DiaChi" class="font-semibold text-[16px]">Địa chỉ</label>
                                        <input type="text" v-model="DiaChi" name="DiaChi" id="DiaChi"
                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="Nhập địa chỉ ..." />
                                        <p class="text-red-500 text-sm">{{ formData.errors.DiaChiDG }}</p>
                                    </div>

                                    <div class="md:col-span-2">
                                        <label for="DienThoai" class="font-semibold text-[16px]">Số điện thoại</label>
                                        <input type="text" v-model="DienThoai" name="DienThoai" id="DienThoai"
                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="079-xxx-xxxx" />
                                        <p class="text-red-500 text-sm">{{ formData.errors.DienThoaiDG }}</p>
                                    </div>

                                    <div class="md:col-span-5 text-right">
                                        <div class="inline-flex items-end">
                                            <button type="submit"
                                                class="bg-[#333f48] hover:bg-[#00697F] text-white font-bold py-2 px-4 rounded">Cập
                                                nhật</button>
                                        </div>
                                    </div>
                                </form>
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
        <Footer />
    </div>
</template>

<style></style>