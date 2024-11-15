<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Header from "../../layout/client/Header.vue";
import Footer from "../../layout/client/Footer.vue";

const router = useRouter();
const userInfo = ref({});
const getDocGia = async (idDocGia) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/docgia/${idDocGia}`);
        userInfo.value = response.data;
        console.log(userInfo.value);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
    }
};

onMounted(() => {
    const maDocGia = router.currentRoute.value.params.maDocGia;
    console.log(maDocGia);
    getDocGia(maDocGia);
}); 
</script>

<template>
    <div class="relative font-sans overflow-hidden min-h-screen">
        <Header />
        <div class="w-[95%] h-[650px] md:h-[570px] mx-auto mt-3 mb-36">
            <div class="image_profile relative w-full h-[350px] bg-center bg-cover bg-no-repeat rounded-xl">
                <div
                    class="w-[90%] bg-[#fdfdfd] absolute top-32 left-[50%] translate-x-[-50%] mx-auto shadow-lg rounded-md pt-[50px] px-2 sm:px-10 pb-10 sm:pb-0 h-fit">
                    <img src="../../assets/img/avatar.jpg"
                        class="w-[100px] h-[100px] bg-[#fff] rounded-full shadow-lg absolute left-1/2 translate-x-[-50%] -top-[50px] bg-center bg-cover"
                        alt="">
                    <div class="flex justify-end items-center flex-col lg:flex-row gap-4 px-2 lg:px-24">
                        <a :href="`/editprofile/${userInfo.MaDocGia}`"
                            class="px-3 py-2 sm:px-5 sm:py-2 bg-[#00697F] text-sm sm:text-md rounded-md font-medium sm:font-bold text-white shadow-md">Chỉnh
                            sửa hồ sơ</a>
                    </div>
                    <div class="text-center mt-12 pb-4">
                        <h3 class="text-2xl font-semibold leading-normal mb-2 text-blueGray-700">{{ userInfo.HoLot }} {{
                            userInfo.Ten }}</h3>
                        <div class="text-base leading-normal mt-0 mb-2 text-[#00697F] font-bold uppercase"><i
                                class="fa-solid fa-phone-volume"></i> {{ userInfo.DienThoai }}
                        </div>
                        <div class="mb-2 text-blueGray-600 mt-10 font-medium">
                            <i class="fa-solid fa-location-dot text-[#00697F]"></i>
                            {{ userInfo.DiaChi }}
                        </div>
                        <div class="mb-2 text-blueGray-600 font-medium">
                            <i class="fa-solid fa-calendar-days mr-2 text-lg text-[#00697F]"></i>
                            {{ new Date(userInfo.NgaySinh).toLocaleDateString('vi-VN') }}
                        </div>
                        <hr />
                        <div class="my-5 lg:text-[18px] text-[15px] font-medium">
                            <p>
                                Chào mừng <span class="text-[#00697F] font-semibold">{{ userInfo.HoLot }} {{ userInfo.Ten }}</span> đã đến với JEIKEI
                                LIBRARY, chúng tôi mong rằng tại đây sẽ thõa mãn được những nhu cầu
                                của bạn. Chúng tôi luôn sẳn sàng hỗ trợ bạn , nếu cần thì mong
                                bạn liên hệ đến Hotline ở trang chủ. Xin cám ơn!!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped>
.image_profile {
    background-image: url('../../assets/img/z5300330066078_500c69306f95b52da4635cb3e9b37424.jpg');
}
</style>