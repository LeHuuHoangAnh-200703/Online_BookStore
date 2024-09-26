<script setup>
import Header from "../../layout/client/Header.vue";
import Footer from "../../layout/client/Footer.vue";
</script>
<template>
  <div class="flex flex-col min-h-screen overflow-hidden">
    <Header />
    <div class="flex-grow lg:py-10 lg:px-24 p-4 bg-[#e8e8e8]">
      <div class="flex gap-8 flex-col">
        <h1 class="text-lg lg:text-[30px] font-bold text-center uppercase">
          Lịch sử mượn sách của bạn
        </h1>
        <div class="p-5 bg-white shadow-md rounded-xl">
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
              <p class="text-[18px] font-semibold">
                Giá mượn:
                <span class="text-[#DC143C] font-semibold">20.000 VNĐ</span>
              </p>
              <div class="flex lg:flex-row flex-col gap-2 lg:justify-between">
                <p class="text-[18px] font-semibold">
                  Loại sách:
                  <span class="font-medium">Truyện tranh (Manga)</span>
                </p>
                <p class="text-[18px] font-semibold">Số lượng: <span class="text-[#00697F]">1</span></p>
              </div>
              <p class="text-[18px] font-semibold">
                Tác giả:
                <span class="font-medium">Hidenori Kusaka, Satoshi Yamamoto</span>
              </p>
              <p class="text-[18px] font-semibold">
                Nhà xuất bản: <span class="font-medium">Kim Đồng</span>
              </p>
              <p class="text-[18px] font-semibold">
                Thể loại:
                <span class="text-[#00697F]">Action, Adventure, Comedy, Elemental Powers, Family Friendly,
                  Fantasy, Monsters, Shounen</span>
              </p>
              <p class="text-[18px] font-semibold">
                Ngày mượn:
                <span class="text-[#00697F]">20-07-2024</span>
              </p>
              <p class="text-[18px] font-semibold">
                Thời gian mượn:
                <span class="text-[#00697F]">1 tuần</span>
              </p>
            </div>
          </div>
          <hr class="bg-[#00697F] my-2" />
          <p class="text-[18px] font-semibold lg:py-2 py-4">Lưu ý: <span class="text-[#00697F]">Chỉ có thể hủy yêu cầu
              mượn khi chưa được duyệt</span></p>
          <div class="flex gap-4 justify-center lg:justify-end">
            <button class="px-4 py-3 bg-[#DC143C] text-white font-semibold">Hủy yêu cầu</button>
            <button
              class="px-4 py-3 bg-[#51A7BF] text-white font-semibold hover:bg-[#00697F] transition-all duration-300">Mượn
              lại</button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style></style>