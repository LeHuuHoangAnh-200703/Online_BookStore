<script setup>
import Header from "../../layout/client/Header.vue";
import Footer from "../../layout/client/Footer.vue";
import { ref } from "vue";

const isOpen = ref(false);
const toggleDropDownOpen = () => {
    isOpen.value = !isOpen.value;
};
</script>
<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <div class="flex-grow lg:py-10 lg:px-24 p-4 bg-[#e8e8e8]">
            <div class="container max-w-screen-lg mx-auto">
                <h1 class="text-lg lg:text-[30px] font-bold text-center uppercase mb-6">
                    Mượn sách tại jeikei Library
                </h1>
                <div>
                    <div class="bg-white rounded-lg shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div class="grid gap-4 gap-y-8 text-sm grid-cols-1 lg:grid-cols-3">
                            <div class="flex justify-center items-center">
                                <img src="../../assets/img/TruyenTranh-4.jpg" class="w-[300px] lg:w-[350px]" alt="">
                            </div>
                            <div class="lg:col-span-2">
                                <form action="/editprofile" method="post"
                                    class="grid gap-5 gap-y-5 text-sm grid-cols-1 md:grid-cols-5"
                                    enctype="multipart/form-data">
                                    <div class="md:col-span-5">
                                        <h1 class="text-[20px] lg:text-[28px] font-semibold">Pokémon Đặc Biệt - Tập 59
                                        </h1>
                                    </div>
                                    <div class="md:col-span-5 flex lg:flex-row flex-col gap-4">
                                        <p class="font-semibold text-[16px] lg:text-[18px]">Giá mượn: <span
                                                class="text-[#DC143C]">20.000 VNĐ</span></p>
                                        <p
                                            class="font-semibold text-[16px] lg:text-[18px] lg:border-l-2 border-[#333f48] lg:pl-4">
                                            Tình
                                            trạng: <span class="text-[#00697F]">còn 300 quyển</span></p>
                                    </div>
                                    <div class="md:col-span-5 flex gap-4 flex-col">
                                        <p class="font-semibold text-[18px]">Chọn số lượng sản phẩm :</p>
                                        <div class="flex gap-3">
                                            <button
                                                class="w-[40px] h-[40px] bg-[#333] rounded-full text-white font-bold hover:bg-[#00697F]">-</button>
                                            <input id="quantity" name="total_amount" value="1"
                                                style="appearance: textfield;" type="number" min="1"
                                                class="text-lg border-[#00697F] border-2 rounded-2xl font-semibold h-10 w-16 text-center" />
                                            <button
                                                class="w-[40px] h-[40px] bg-[#333] rounded-full text-white font-bold hover:bg-[#00697F]">+</button>
                                        </div>
                                    </div>
                                    <div class="md:col-span-5 flex gap-4 flex-col">
                                        <div class="flex gap-4 flex-col">
                                            <label class="text-[16px] font-semibold">Ngày mượn:</label>
                                            <input type="date" name="borrow_date" class="border rounded p-2 w-full"
                                                required />
                                        </div>
                                        <div class="flex gap-4 flex-col">
                                            <label class="text-[16px] font-semibold">Ngày trả:</label>
                                            <input type="date" name="return_date" class="border rounded p-2 w-full"
                                                required />
                                        </div>
                                    </div>
                                    <div class="md:col-span-3">
                                        <label for="address" class="font-semibold text-[16px]">Địa chỉ</label>
                                        <input type="text" name="address" id="address"
                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="Long My - Hau Giang" />
                                    </div>
                                    <div class="md:col-span-2">
                                        <label for="city" class="font-semibold text-[16px]">Số điện thoại</label>
                                        <input type="text" name="phone" id="city"
                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="079-xxx-xxxx" />
                                    </div>
                                    <div class="md:col-span-5 text-center lg:text-left">
                                        <div class="inline-flex items-start">
                                            <button type="submit"
                                                class="bg-[#333f48] hover:bg-[#00697F] text-white font-bold py-3 px-4 rounded">Mượn
                                                sản phẩm</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style></style>