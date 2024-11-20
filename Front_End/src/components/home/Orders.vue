<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Header from "../../layout/client/Header.vue";
import Footer from "../../layout/client/Footer.vue";

const router = useRouter();
const bookInfo = ref({});
const MaSach = ref("");
const SoLuong = ref(1);
const NgayTra = ref("");
const notification = ref({
    message: '',
    type: ''
});
const getBook = async (idSach) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/sach/maSach/${idSach}`);
        bookInfo.value = response.data;
        console.log(bookInfo.value);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
    }
};

const addOrderBook = async () => {
    const maDocGia = localStorage.getItem('MaDocGia');
    try {
        const newOrderBook = {
            MaDocGia: maDocGia,
            MaSach: MaSach.value,
            NgayTra: NgayTra.value,
            SoLuong: SoLuong.value
        };
        console.log(newOrderBook);
        const response = await axios.post("http://localhost:5000/api/theodoimuonsach", newOrderBook);
        const confirmDelete = confirm("Vui lòng kiểm tra lại thông tin trước khi mượn sách?");
        if (!confirmDelete) return;
        notification.value = {
            message: 'Mượn sách thành công!',
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

const plus = () => {
    return SoLuong.value++;
}

const minus = () => {
    if (SoLuong.value > 1) {
        SoLuong.value--;
    }
}

const formatCurrency = (value) => {
    const formattedValue = value * 1000;
    return formattedValue.toLocaleString('vi-VN') + ' ' + 'VNĐ';
};

onMounted(() => {
    const maSach = router.currentRoute.value.params.maSach;
    console.log(maSach);
    MaSach.value = maSach;
    getBook(maSach);
}); 
</script>
<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <div class="relative flex-grow lg:py-10 lg:px-24 p-4 bg-[#e8e8e8]">
            <div class="container max-w-screen-lg mx-auto">
                <h1 class="text-lg lg:text-[30px] font-bold text-center uppercase mb-6">
                    Mượn sách tại <span class="text-[#00697F]">jeikei Library</span>
                </h1>
                <div>
                    <div class="bg-white rounded-lg shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div class="grid gap-4 gap-y-8 text-sm grid-cols-1 lg:grid-cols-3">
                            <div class="flex justify-center items-center">
                                <img :src="`/src${bookInfo.Image}`" class="w-[300px] lg:w-[350px]" alt="">
                            </div>
                            <div class="lg:col-span-2">
                                <form @submit.prevent="addOrderBook" action="" method="POST"
                                    class="grid gap-5 gap-y-5 text-sm grid-cols-1 md:grid-cols-5"
                                    enctype="multipart/form-data">
                                    <div class="md:col-span-5">
                                        <h1 class="text-[20px] leading-snug lg:text-[24px] font-semibold">{{ bookInfo.TenSach }}
                                        </h1>
                                    </div>
                                    <div class="md:col-span-5 flex lg:flex-row flex-col gap-4">
                                        <p class="font-semibold text-[16px] lg:text-[18px]">Giá mượn: <span
                                                class="text-[#DC143C]">{{ formatCurrency(bookInfo.DonGia) }}</span></p>
                                        <p
                                            class="font-semibold text-[16px] lg:text-[18px] lg:border-l-2 border-[#333f48] lg:pl-4">
                                            Tình
                                            trạng: <span class="text-[#00697F]">còn {{ bookInfo.SoQuyen }} quyển</span>
                                        </p>
                                    </div>
                                    <div class="md:col-span-5 flex gap-4 flex-col">
                                        <p class="font-semibold text-[18px]">Chọn số lượng sách :</p>
                                        <div class="flex gap-3">
                                            <button @click.prevent="minus"
                                                class="w-[40px] h-[40px] bg-[#333] rounded-full text-white font-bold hover:bg-[#00697F]">-</button>
                                            <input id="quantity" v-model="SoLuong" name="total_amount" value="1"
                                                style="appearance: textfield;" type="number" min="1"
                                                class="text-lg border-[#00697F] border-2 rounded-2xl font-semibold h-10 w-16 text-center" />
                                            <button @click.prevent="plus"
                                                class="w-[40px] h-[40px] bg-[#333] rounded-full text-white font-bold hover:bg-[#00697F]">+</button>
                                        </div>
                                    </div>
                                    <div class="md:col-span-5 flex gap-4 flex-col">
                                        <div class="flex gap-4 flex-col">
                                            <label class="text-[16px] font-semibold">Ngày trả:</label>
                                            <input type="date" v-model="NgayTra" name="return_date"
                                                class="border rounded p-2 w-full" required />
                                        </div>
                                    </div>
                                    <div class="md:col-span-5 text-center lg:text-left">
                                        <div class="inline-flex items-start">
                                            <button type="submit"
                                                class="bg-[#333f48] hover:bg-[#00697F] text-white font-bold py-3 px-4 rounded">Mượn
                                                sách</button>
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