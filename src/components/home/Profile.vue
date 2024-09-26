<script setup>
import Header from "../../layout/client/Header.vue";
import Footer from "../../layout/client/Footer.vue";
</script>

<template>
    <div class="relative font-sans overflow-hidden min-h-screen">
        <Header />
        <div class="w-[95%] h-[650px] md:h-[570px] mx-auto mt-3 mb-36">
            <div class="relative w-full">
                <!-- <img src="../../assets/img/z5300330066078_500c69306f95b52da4635cb3e9b37424.jpg" class="relative h-[350px] w-full rounded-xl" alt=""> -->
                <div
                    class="w-[90%] bg-[#fdfdfd] absolute top-32 left-[50%] translate-x-[-50%] mx-auto shadow-lg rounded-md pt-[50px] px-2 sm:px-10 pb-10 sm:pb-0 h-fit">
                    <img src="../../assets/img/avatar-1.jpg"
                        class="w-[100px] h-[100px] bg-[#fff] rounded-full shadow-lg absolute left-1/2 translate-x-[-50%] -top-[50px] bg-center bg-cover"
                        alt="">
                    <div class="flex justify-between items-center flex-col lg:flex-row gap-4 px-2 lg:px-24">
                        <ul class="flex gap-x-6">
                            <li class="flex flex-col items-center">
                                <span class="font-bold text-lg text-[#00697F]">2</span><span class="text-slate-400">Số
                                    đơn hàng</span>
                            </li>
                        </ul>
                        <a href="/editprofile"
                            class="px-3 py-2 sm:px-5 sm:py-2 bg-[#00697F] text-sm sm:text-md rounded-md font-medium sm:font-bold text-white shadow-md">Chỉnh
                            sửa hồ sơ</a>
                    </div>
                    <div class="text-center mt-12 pb-4">
                        <h3 class="text-2xl font-semibold leading-normal mb-2 text-blueGray-700">Lê Hữu Hoàng Anh</h3>
                        <div class="text-base leading-normal mt-0 mb-2 text-[#00697F] font-bold uppercase"><i
                                class="fa-regular fa-envelope"></i> hoanganh2003@gmail.com
                        </div>
                        <div class="mb-2 text-blueGray-600 mt-10 font-medium">
                            <i class="fa-solid fa-location-dot text-[#00697F]"></i>
                            Việt Nam - Hậu Giang
                        </div>
                        <div class="mb-2 text-blueGray-600 font-medium">
                            <i class="fa-solid fa-phone mr-2 text-lg text-[#00697F]"></i>
                            079-965-8592
                        </div>
                        <hr />
                        <div class="my-5 lg:text-[18px] text-[15px] font-medium">
                            <p>
                                Chào mừng <span class="uppercase">Hoàng Anh</span> đã đến với JEIKEI
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

<style></style>