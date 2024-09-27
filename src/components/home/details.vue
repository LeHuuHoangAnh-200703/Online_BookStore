<script setup>
import Header from "../../layout/client/Header.vue";
import Footer from "../../layout/client/Footer.vue";
</script>

<template>
  <div class="relative font-sans overflow-hidden min-h-screen">
    <Header />
    <div class="lg:py-10 lg:px-10 p-4 bg-[#e8e8e8]">
      <div class="flex gap-8 lg:flex-row flex-col">
        <div class="w-full lg:w-[40%] bg-white gap-8 p-8 rounded-2xl flex flex-col justify-start items-center">
          <div class="flex flex-col gap-5">
            <img src="../../assets/img/TruyenTranh-4.jpg" class="w-[500px]" alt="" />
          </div>
          <div class="flex flex-col gap-5">
            <h2 class="text-[18px] lg:text-[22px] font-semibold">
              Chính sách của JeiKei Library
            </h2>
            <ul class="flex flex-col gap-2">
              <li class="text-[15px] lg:text-[20px] font-semibold">
                <i class="fa-solid fa-comment-dots text-[#00697F]"></i> Yêu cầu
                mượn sách:
                <span class="font-medium">Xử lý nhanh chóng và chính xác.</span>
              </li>
              <li class="text-[15px] lg:text-[20px] font-semibold">
                <i class="fa-solid fa-book text-[#00697F]"></i> Chính sách trả
                sách:
                <span class="font-medium">Miễn phí tại bất kỳ chi nhánh nào.</span>
              </li>
              <li class="text-[15px] lg:text-[20px] font-semibold">
                <i class="fa-solid fa-circle-check text-[#00697F]"></i> Ưu đãi
                mượn nhiều:
                <span class="font-medium">Ưu đãi thời gian mượn và phí phạt.</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full lg:w-[60%] flex flex-col gap-3">
          <div class="flex flex-col gap-3 bg-white rounded-2xl p-8">
            <h1 class="text-[24px] lg:text-[40px] font-semibold">
              Pokémon Đặc Biệt - Tập 59
            </h1>
            <p class="text-[18px] lg:text-[20px]">
              Loại sách:
              <span class="text-[#00697F] font-semibold">Truyện tranh (Manga)</span>
            </p>
            <p class="text-[18px] lg:text-[20px]">
              Tình trạng:
              <span class="text-[#00697F] font-semibold">vẫn còn 300 quyển trong thư viện</span>
            </p>
            <p class="text-[18px] lg:text-[24px]">
              Giá mượn:
              <span class="text-[#DC143C] font-semibold">20.000 VNĐ</span>
            </p>
            <hr />
            <h2 class="text-[20px] lg:text-[26px] font-semibold">
              Thông tin chi tiết
            </h2>
            <p class="text-[18px] lg:text-[20px]">
              Tác giả: <span>Hidenori Kusaka, Satoshi Yamamoto</span>
            </p>
            <p class="text-[18px] lg:text-[20px]">
              Nhà xuất bản: <span>Kim Đồng</span>
            </p>
            <a href=""
              class="w-full bg-[#51A7BF] flex flex-col gap-2 justify-center items-center p-4 text-[14px] lg:text-[20px] font-semibold text-white hover:bg-[#00697F] transition-all duration-200">MƯỢN
              SÁCH NGAY
              <span class="text-[12px] lg:text-[16px]">JEIKEI LIBRARY 100% sách chính hãng</span></a>
          </div>
          <div class="flex flex-col gap-3 bg-white rounded-2xl p-8">
            <h1 class="text-[20px] lg:text-[26px] font-semibold">
              Mô tả sản phẩm
            </h1>
            <h2 class="text-[16px] lg:text-[20px] font-semibold">
              Pokémon Đặc Biệt - Tập 59
            </h2>
            <p class="text-[16px] lg:text-[20px] font-medium text-justify">
              Trận chiến giành cây cổ thụ - Zeruneasu đã diễn ra! Dù dốc hết sức
              mình chiến đấu, Koruni vẫn thua trong gang tấc nên đành để cho
              “cây cổ thụ” và đá khai mở bị cướp đi!! Cảm thấy có lỗi trong việc
              này, X một lần nữa đóng kín trái tim lại… Trong khi đó, tên trùm
              Furadari bên phía kẻ thù đang dần chiếm được quyền lực! “Vũ khí
              tối thượng” - Di sản đen tối từ 3 ngàn năm trước cuối cùng cũng
              xuất hiện!!!!
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style></style>