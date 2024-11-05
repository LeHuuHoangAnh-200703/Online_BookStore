<script setup>
import sidebar from '../../layout/admin/Sidebar.vue';
import navbar from '../../layout/admin/Navbar.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref({
    idNXB: '',
    TenNXB: '',
    DiaChiNXB: '',
    errors: {
        idNXB: '',
        TenNXB: '',
        DiaChiNXB: '',
    }
});

const notification = ref({
    message: "",
    type: ""
});

const fetchPublishingHouseData = async (maNXB) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/nhaxuatban/${maNXB}`);
        formData.value.idNXB = response.data.MaNXB;
        formData.value.TenNXB = response.data.TenNXB;
        formData.value.DiaChiNXB = response.data.DiaChi;
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching publishingHouse data:', error);
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
            MaNXB : formData.value.idNXB,
            TenNXB : formData.value.TenNXB,
            DiaChi : formData.value.DiaChiNXB,
        }
        const response = await axios.put(`http://localhost:5000/api/nhaxuatban/${formData.value.idNXB}`, dataSend);

        notification.value = {
            message: 'Nhà xuất bản đã được chỉnh sửa thành công!',
            type: 'success'
        };

        setTimeout(() => {
            router.push('/admin/NXBLists');
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
    const maNXB = router.currentRoute.value.params.maNXB;
    console.log(maNXB);
    fetchPublishingHouseData(maNXB);
}); 
</script>

<template>
    <div class="flex font-sans">
        <sidebar />
        <div class="flex flex-col w-full">
            <navbar />
            <div class="w-[95%] mx-auto h-[100%] my-5 overflow-hidden">
                <div class="text-center py-4">
                    <h2 class="text-[#333] font-bold text-[20px]">CHỈNH SỬA NHÀ XUẤT BẢN</h2>
                </div>
                <form @submit.prevent="submitForm" action="" method="POST" enctype="multipart/form-data"
                    class="w-full max-h-[calc(100vh-200px)] overflow-y-scroll">
                    <div
                        class="flex flex-col bg-white w-full md:w-[70%] mx-auto gap-5 border-2 rounded-xl shadow-md p-5 m-2">
                        <div class="">
                            <div>
                                <label for="TenNXB"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Tên nhà xuất bản</label>
                                <input v-model="formData.TenNXB" name="TenNXB" autofocus type="text" id="TenNXB"
                                    :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed', formData.errors.TenNXB ? 'input-error' : '']"
                                    placeholder="Nhập tên nhà xuất bản ..." />
                                <p class="text-red-500 text-sm">{{ formData.errors.TenNXB }}</p>
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="DiachiNXB"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Địa chỉ</label>
                                <input v-model="formData.DiaChiNXB" name="DiachiNXB" autofocus type="text" id="DiachiNXB"
                                    :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed', formData.errors.DiaChiNXB ? 'input-error' : '']"
                                    placeholder="Nhập địa chỉ ..." />
                                <p class="text-red-500 text-sm">{{ formData.errors.DiaChiNXB }}</p>
                            </div>
                        </div>
                        <div class="text-center">
                            <button type="submit"
                                class="inline-block rounded-lg bg-[#00697F] px-5 py-2.5 text-sm font-bold text-[#fff] shadow-md hover:scale-110 transition-all duration-200">Sửa
                                nhà xuất bản</button>
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