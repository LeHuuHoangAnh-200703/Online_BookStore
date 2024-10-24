<script setup>
import Header from "../../layout/client/Header.vue";
import Footer from "../../layout/client/Footer.vue";
</script>
<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <div class="flex-grow lg:py-10 lg:px-24 p-4 bg-[#e8e8e8]">
            <div class="container max-w-screen-lg mx-auto">
                <div>
                    <div class="bg-white rounded-lg shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div class="text-[#333f48] font-semibold">
                                <p class="text-lg">Chỉnh sửa thông tin cá nhân</p>
                                <p>Vui lòng điền thông tin đầy đủ.</p>
                            </div>
                            <div class="lg:col-span-2">
                                <form action="/editprofile" method="post"
                                    class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
                                    enctype="multipart/form-data">
                                    <div class="md:col-span-5">
                                        <label for="full_name" class="font-semibold text-[16px]">Họ tên</label>
                                        <input type="text" name="name" id="full_name"
                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="JeiKei" />
                                    </div>

                                    <div class="md:col-span-5">
                                        <label for="email" class="font-semibold text-[16px]">Địa chỉ email</label>
                                        <input type="text" name="email" id="email"
                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="email@domain.com" />
                                    </div>

                                    <div class="md:col-span-5">
                                        <label for="dob" class="font-semibold text-[16px]">Ngày sinh</label>
                                        <input type="date" name="dob" id="dob"
                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>

                                    <div class="md:col-span-5">
                                        <label for="gender" class="font-semibold text-[16px]">Phái</label>
                                        <select name="gender" id="gender"
                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                                            <option value="">Chọn phái</option>
                                            <option value="male">Nam</option>
                                            <option value="female">Nữ</option>
                                            <option value="other">Khác</option>
                                        </select>
                                    </div>

                                    <div class="md:col-span-3">
                                        <label for="address" class="font-semibold text-[16px]">Địa chỉ / Đường</label>
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

                                    <div class="md:col-span-5 mt-1">
                                        <label for="city" class="font-semibold text-[16px]">Ảnh của bạn : </label>
                                        <input type="file" name="image" id="imageInput" />
                                    </div>
                                    <div
                                        class="border border-1 border-[#0000001a] md:col-span-5 p-5 h-[200px] rounded-md flex justify-center items-center">
                                        <img id="imagePreview" class="hidden" src="#" alt="Image Preview"
                                            style="max-width:200px; max-height:200px">
                                        <div class="text-[60px] text-slate-300" id="image_icon">
                                            <i class="fa-regular fa-image"></i>
                                        </div>
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
        </div>
        <Footer />
    </div>
</template>

<style></style>