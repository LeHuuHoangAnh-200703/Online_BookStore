<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Header from "../../layout/client/Header.vue";
import Footer from "../../layout/client/Footer.vue";

const router = useRouter();
const bookInfo = ref({});
const getDetailBook = async (idSach) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/sach/maSach/${idSach}`);
        bookInfo.value = response.data;
        console.log(bookInfo.value);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
    }
};

const formatCurrency = (value) => {
    const formattedValue = value * 1000;
    return formattedValue.toLocaleString('vi-VN') + ' ' + 'VNĐ';
};

const borrowBook = () => {
    const maDocGia = localStorage.getItem('MaDocGia');
    if (!maDocGia) {
        router.push('/login');
    } else {
        router.push(`/order/${bookInfo.value.MaSach}`);
    }
};

onMounted(() => {
    const maSach = router.currentRoute.value.params.maSach;
    console.log(maSach);
    getDetailBook(maSach);
}); 
</script>

<template>
  <div class="relative font-sans overflow-hidden min-h-screen">
    <Header />
    <div class="lg:py-10 lg:px-10 p-4 bg-[#e8e8e8]">
      <div class="flex gap-8 lg:flex-row flex-col">
        <div class="w-full lg:w-[40%] bg-white gap-8 p-8 rounded-2xl flex flex-col justify-start items-center">
          <div class="flex flex-col gap-5">
            <img :src="`/src${bookInfo.Image}`" class="w-[500px]" alt="" />
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
              {{ bookInfo.TenSach }}
            </h1>
            <p class="text-[18px] lg:text-[20px]">
              Loại sách:
              <span class="text-[#00697F] font-semibold">{{ bookInfo.Type }}</span>
            </p>
            <p class="text-[18px] lg:text-[20px]">
              Tình trạng:
              <span class="text-[#00697F] font-semibold">vẫn còn {{ bookInfo.SoQuyen }} quyển trong thư viện</span>
            </p>
            <p class="text-[18px] lg:text-[24px]">
              Giá mượn:
              <span class="text-[#DC143C] font-semibold">{{ formatCurrency(bookInfo.DonGia) }}</span>
            </p>
            <hr />
            <h2 class="text-[20px] lg:text-[26px] font-semibold">
              Thông tin chi tiết
            </h2>
            <p class="text-[18px] lg:text-[20px]">
              Tác giả: <span>{{ bookInfo.TacGia }}</span>
            </p>
            <p class="text-[18px] lg:text-[20px]">
              Mã nhà xuất bản: <span>{{ bookInfo.MaNXB }}</span>
            </p>
            <p class="text-[18px] lg:text-[20px]">
              Năm xuất bản: <span>{{ bookInfo.NamXuatBan }}</span>
            </p>
            <button @click.prevent="borrowBook"
              class="w-full bg-[#51A7BF] flex flex-col gap-2 justify-center items-center p-4 text-[14px] lg:text-[20px] font-semibold text-white hover:bg-[#00697F] transition-all duration-200">MƯỢN
              SÁCH NGAY
              <span class="text-[12px] lg:text-[16px]">JEIKEI LIBRARY 100% sách chính hãng</span></button>
          </div>
          <div class="flex flex-col gap-3 bg-white rounded-2xl p-8">
            <h1 class="text-[20px] lg:text-[26px] font-semibold">
              Mô tả sản phẩm
            </h1>
            <h2 class="text-[16px] lg:text-[20px] font-semibold">
              {{ bookInfo.TenSach }}
            </h2>
            <p class="text-[16px] lg:text-[20px] font-medium text-justify">
              {{ bookInfo.MoTa }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style></style>