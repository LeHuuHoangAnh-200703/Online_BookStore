<script setup>
import sidebar from '../../layout/admin/Sidebar.vue';
import navbar from '../../layout/admin/Navbar.vue';
</script>

<template>
    <div class="flex font-sans">
        <sidebar />
        <div class="flex flex-col w-full">
            <navbar />
            <div class="w-[95%] mx-auto h-[100%] my-4">
                <div class="text-center py-2">
                    <h2 class="text-[#333] font-bold tex-[18px] lg:text-[20px] uppercase">Danh sách các yêu cầu mượn sách</h2>
                </div>
                <div class="p-5 bg-white shadow-lg rounded-xl border-2 my-6">
                    <div class="flex flex-col lg:flex-row items-center justify-center lg:justify-between py-2">
                        <p class="font-bold lg:text-xl text-[14px] uppercase text-[#00697F]">
                            <i class="fa-solid fa-book"></i> - JEIKEI LIBRARY
                        </p>
                        <p class="text-[#DC143C] lg:text-xl text-[14px] font-semibold">
                            <i class="fa-solid fa-rotate-right"></i> Yêu cầu mượn sách đang xử
                            lý
                        </p>
                    </div>
                    <hr class="bg-[#00697F] my-2" />
                    <div class="flex lg:flex-row flex-col lg:gap-2 gap-4  p-3 items-center justify-center">
                        <img src="../../assets/img/TruyenTranh-4.jpg" class="w-[200px]" alt="" />
                        <div class="flex flex-col gap-2 w-full">
                            <p class="text-[20px] font-semibold">Pokémon Đặc Biệt - Tập 59</p>
                            <p class="text-[16px] lg:text-[18px] font-semibold">
                                Giá mượn:
                                <span class="text-[#DC143C] font-semibold">20.000 VNĐ</span>
                            </p>
                            <div class="flex lg:flex-row flex-col gap-2 lg:justify-between">
                                <p class="text-[16px] lg:text-[18px] font-semibold">
                                    Loại sách:
                                    <span class="font-medium">Truyện tranh (Manga)</span>
                                </p>
                                <p class="text-[16px] lg:text-[18px] font-semibold">Số lượng: <span class="text-[#00697F]">1</span></p>
                            </div>
                            <p class="text-[16px] lg:text-[18px] font-semibold">
                                Tên người mượn:
                                <span class="font-medium">Lê Hữu Hoàng Anh</span>
                            </p>
                            <p class="text-[16px] lg:text-[18px] font-semibold">
                                Liên lạc: <span class="font-medium">079-965-8592</span>
                            </p>
                            <p class="text-[16px] lg:text-[18px] font-semibold">
                                Ngày mượn:
                                <span class="text-[#00697F]">20-07-2024</span>
                            </p>
                            <p class="text-[16px] lg:text-[18px] font-semibold">
                                Thời gian mượn:
                                <span class="text-[#00697F]">1 tuần</span>
                            </p>
                        </div>
                    </div>
                    <hr class="bg-[#00697F] my-2" />
                    <p class="text-[16px] lg:text-[18px] font-semibold lg:py-2 py-4">Lưu ý: <span class="text-[#00697F]">Vui lòng liên hệ để xác nhận.</span></p>
                    <div class="flex gap-4 justify-center lg:justify-end flex-wrap">
                        <button class="px-4 py-3 bg-[#DC143C] text-white font-semibold">Hủy yêu cầu</button>
                        <button
                            class="px-4 py-3 bg-[#7293f6] text-white font-semibold hover:bg-[#4169E1] transition-all duration-300">Đã hoàn trả</button>
                        <button
                            class="px-4 py-3 bg-[#51A7BF] text-white font-semibold hover:bg-[#00697F] transition-all duration-300">Duyệt yêu cầu</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>