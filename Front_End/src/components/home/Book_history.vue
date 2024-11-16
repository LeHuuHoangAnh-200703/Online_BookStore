<script setup>
import { ref, onMounted } from "vue";
import Header from "../../layout/client/Header.vue";
import Footer from "../../layout/client/Footer.vue";
import axios from 'axios';
const listOrderBooks = ref([]);
const maDocGia = localStorage.getItem('MaDocGia');
const notification = ref({
  message: '',
  type: ''
});
const getDonMuonSach = async (maDocGia) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/theodoimuonsach/docgia/${maDocGia}`);
    listOrderBooks.value = response.data;
    console.log(listOrderBooks.value);
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
  }
};

const huyDon = async (orderId) => {
  const order = listOrderBooks.value.find(ord => ord._id === orderId);
  if (order.TrangThaiDuyet === 'Đang chờ duyệt') {
    const confirmDelete = confirm("Bạn chắc chắn muốn hủy đơn mượn sách này chứ?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/theodoimuonsach/${orderId}`);
      listOrderBooks.value = listOrderBooks.value.filter(orderBook => orderBook._id !== orderId);
      notification.value = {
        message: 'Hủy đơn mượn sách thành công!',
        type: 'success'
      };
    } catch (error) {
      console.error('Error hủy đơn mượn:', error);
    }
  } else {
    notification.value = {
      message: 'Không thể hủy vì đơn mượn sách đã được duyệt!',
      type: 'success'
    };
  }
  setTimeout(() => {
    notification.value.message = '';
  }, 3000);
};

const formatCurrency = (value) => {
    const formattedValue = value * 1000;
    return formattedValue.toLocaleString('vi-VN') + ' ' + 'VNĐ';
};

onMounted(() => {
  console.log(maDocGia)
  if (maDocGia) {
    getDonMuonSach(maDocGia);
  }
});
</script>
<template>
  <div class="flex flex-col min-h-screen overflow-hidden">
    <Header />
    <div class="relative flex-grow lg:py-10 lg:px-24 p-4 bg-[#e8e8e8]">
      <div class="flex gap-8 flex-col">
        <h1 class="text-lg lg:text-[30px] font-bold text-center uppercase">
          Lịch sử mượn sách của bạn
        </h1>
        <div class="p-5 bg-white shadow-md rounded-xl" v-for="order in listOrderBooks" :key="order._id">
          <div class="flex flex-col lg:flex-row items-center justify-center lg:justify-between py-2">
            <p class="font-bold lg:text-xl text-[14px] uppercase text-[#00697F]">
              <i class="fa-solid fa-book"></i> - JEIKEI LIBRARY
            </p>
            <p class="text-[#DC143C] lg:text-xl text-[14px] font-semibold">
              <i class="fa-brands fa-slack"></i> {{ order.TrangThaiDuyet }}
            </p>
          </div>
          <hr class="bg-[#00697F] my-2" />
          <div class="flex lg:flex-row flex-col lg:gap-2 gap-4  p-3 items-center justify-center">
            <div class="flex flex-col gap-2 w-full">
              <p class="text-[18px] font-semibold">Mã sách: <span class="text-[#00697F]">{{ order.MaSach }}</span></p>
              <p class="text-[18px] font-semibold">Tổng tiền: <span class="text-[#00697F]">{{ formatCurrency(order.TongTien) }}</span></p>
              <p class="text-[18px] font-semibold">
                Ngày mượn:
                <span class="text-[#00697F] font-semibold">{{ new Date(order.NgayMuon).toLocaleDateString('vi-VN')
                  }}</span>
              </p>
              <div class="flex lg:flex-row flex-col gap-2 lg:justify-between">
                <p class="text-[18px] font-semibold">
                  Ngày trả:
                  <span class="font-semibold text-[#00697F]">{{ new Date(order.NgayTra).toLocaleDateString('vi-VN')
                    }}</span>
                </p>
                <p class="text-[18px] font-semibold">Số lượng: <span class="text-[#00697F]">{{ order.SoLuong }}</span>
                </p>
              </div>
              <p class="text-[18px] font-semibold">
                Trạng thái:
                <span class="font-semibold text-[#DC143C]">{{ order.TrangThai }}</span>
              </p>
            </div>
          </div>
          <hr class="bg-[#00697F] my-2" />
          <p class="text-[18px] font-semibold lg:py-2 py-4">Lưu ý: <span class="text-[#DC143C]">Chỉ có thể hủy yêu cầu
              mượn khi chưa được duyệt!</span></p>
          <div class="flex gap-4 justify-center lg:justify-end">
            <button @click.prevent="huyDon(order._id)" class="px-4 py-3 bg-[#DC143C] text-white font-semibold">Hủy yêu
              cầu</button>
            <a :href="`order/${order.MaSach}`"
              class="px-4 py-3 bg-[#51A7BF] text-white font-semibold hover:bg-[#00697F] transition-all duration-300">Mượn
              lại</a>
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

<style></style>