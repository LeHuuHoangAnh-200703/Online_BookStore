<script setup>
import sidebar from '../../layout/admin/Sidebar.vue';
import navbar from '../../layout/admin/Navbar.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
let orderID = null;

const formData = ref({
    MaDG:'',
    MaSach: '',
    NgayMuon: '',
    NgayTra: '',
    errors: {
        MaDG:'',
        MaSach: '',
        NgayMuon: '',
        NgayTra: '',
    }
});

const notification = ref({
    message: "",
    type: ""
});

const fetchOrderBook = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/theodoimuonsach/${id}`);
        formData.value.MaDG = response.data.MaDocGia;
        formData.value.MaSach = response.data.MaSach;
        formData.value.NgayMuon = new Date( response.data.NgayMuon).toISOString().slice(0, 10);
        formData.value.NgayTra = new Date( response.data.NgayTra).toISOString().slice(0, 10);
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching order data:', error);
    }
};

const submitForm = async () => {
    Object.keys(formData.value.errors).forEach(key => {
        formData.value.errors[key] = '';
    });

    let hasError = false;

    if (!formData.value.MaDG) {
        formData.value.errors.MaDG = 'Mã đọc giả không được để trống!';
        hasError = true;
    }
    if (!formData.value.MaSach) {
        formData.value.errors.MaSach = 'Mã sách không được để trống!';
        hasError = true;
    }
    if (!formData.value.NgayMuon) {
        formData.value.errors.NgayMuon = 'Ngày mượn không được để trống!';
        hasError = true;
    }
    if (!formData.value.NgayTra) {
        formData.value.errors.NgayTra = 'Ngày trả không được để trống!';
        hasError = true;
    }
    if (hasError) {
        return;
    }

    try {
        const dataSend = {
            MaDocGia : formData.value.MaDG,
            MaSach : formData.value.MaSach,
            NgayMuon : formData.value.NgayMuon,
            NgayTra : formData.value.NgayTra,
        }

        const response = await axios.put(`http://localhost:5000/api/theodoimuonsach/${orderID}`, dataSend);

        notification.value = {
            message: 'Thông tin mượn sách đã được chỉnh sửa thành công!',
            type: 'success'
        };
        
        setTimeout(() => {
            router.push('/admin/ordersBook');
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
    orderID = router.currentRoute.value.params.id;
    console.log(orderID);
    fetchOrderBook(orderID);
}); 
</script>

<template>
    <div class="flex font-sans">
        <sidebar />
        <div class="flex flex-col w-full">
            <navbar />
            <div class="relative w-[95%] mx-auto h-[100%] my-5 overflow-hidden">
                <div class="text-center py-4">
                    <h2 class="text-[#333] font-bold text-[20px]">CHỈNH SỬA THÔNG TIN MƯỢN SÁCH</h2>
                </div>
                <form @submit.prevent="submitForm" action="" method="POST" enctype="multipart/form-data"
                    class="w-full max-h-[calc(100vh-200px)] overflow-y-scroll">
                    <div
                        class="flex flex-col bg-white w-full md:w-[70%] mx-auto gap-5 border-2 rounded-xl shadow-md p-5 m-2">
                        <div class="">
                            <div>
                                <label for="MaDG"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Mã đọc giả</label>
                                <input v-model="formData.MaDG" name="MaDG" autofocus type="text" id="MaDG"
                                    :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed', formData.errors.MaDG ? 'input-error' : '']"
                                    placeholder="Nhập mã đọc giả ..." />
                                <p class="text-red-500 text-sm">{{ formData.errors.MaDG }}</p>
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="MaSach"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Mã sách</label>
                                <input v-model="formData.MaSach" name="MaSach" autofocus type="text" id="MaSach"
                                    :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed', formData.errors.MaSach ? 'input-error' : '']"
                                    placeholder="Nhập mã sách ..." />
                                <p class="text-red-500 text-sm">{{ formData.errors.MaSach }}</p>
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="NgayMuon"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Ngày mượn</label>
                                <input v-model="formData.NgayMuon" readonly name="MaSach" autofocus type="date" id="NgayMuon"
                                    :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed', formData.errors.NgayMuon ? 'input-error' : '']"
                                />
                                <p class="text-red-500 text-sm">{{ formData.errors.NgayMuon }}</p>
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="NgayTra"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Ngày trả</label>
                                <input v-model="formData.NgayTra" name="MaSach" autofocus type="date" id="NgayTra"
                                    :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed', formData.errors.NgayTra ? 'input-error' : '']"
                                />
                                <p class="text-red-500 text-sm">{{ formData.errors.NgayTra }}</p>
                            </div>
                        </div>
                        <div class="text-center">
                            <button type="submit"
                                class="inline-block rounded-lg bg-[#00697F] px-5 py-2.5 text-sm font-bold text-[#fff] shadow-md hover:scale-110 transition-all duration-200">Chỉnh sửa
                                thông tin mượn sách</button>
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