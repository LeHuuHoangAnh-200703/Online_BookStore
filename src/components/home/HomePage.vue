<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { computed } from "vue";
import Header from "../../layout/client/Header.vue";
import Footer from "../../layout/client/Footer.vue";

const images = ref([
  "/src/assets/img/home-book-1.png",
  "/src/assets/img/home-book-2.png",
  "/src/assets/img/home-book-3.png",
]);

const listBooks = ref([
  {
    name: "Muốn - Một Tiểu Thuyết",
    image: "/src/assets/img/TieuThuyet-1.jpg",
    author: "Emma Cline",
    type: "TieuThuyet",
  },
  {
    name: "Tiểu Thuyết Việt Nam 1945 -1975",
    image: "/src/assets/img/TieuThuyet-2.jpg",
    author: "Phạm Ngọc Hiền",
    type: "TieuThuyet",
  },
  {
    name: "Toán Học, Một Thiên Tiểu Thuyết",
    image: "/src/assets/img/TieuThuyet-3.jpg",
    author: "Mickaël Launay",
    type: "TieuThuyet",
  },
  {
    name: "Tiểu Thuyết Lịch Sử - Hồ Xuân Hương",
    image: "/src/assets/img/TieuThuyet-4.jpg",
    author: "Nguyễn Thế Quang",
    type: "TieuThuyet",
  },
  {
    name: "Pokémon Đặc Biệt - Tập 59",
    image: "/src/assets/img/TruyenTranh-4.jpg",
    author: "Hidenori Kusaka, Satoshi Yamamoto",
    type: "TruyenTranh",
  },
  {
    name: "Shin - Cậu Bé Bút Chì - Truyện Dài - Tập 17 - Công Phá Xứ Sở Mộng Mơ",
    image: "/src/assets/img/TruyenTranh-1.jpg",
    author: "Yoshito Usui, Mirei Takata",
    type: "TruyenTranh",
  },
  {
    name: "Pokémon Đặc Biệt - Tập 60",
    image: "/src/assets/img/TruyenTranh-2.jpg",
    author: "Hidenori Kusaka, Satoshi Yamamoto",
    type: "TruyenTranh",
  },
  {
    name: "Shin - Cậu Bé Bút Chì - Phiên Bản Hoạt Hình Màu - Tập 6 - Vua Côn Trùng Kasukabe (Tái Bản 2024)",
    image: "/src/assets/img/TruyenTranh-3.jpg",
    author: "Yoshito Usui",
    type: "TruyenTranh",
  },
  {
    name: "Từ Điển Tâm Lý",
    image: "/src/assets/img/TuDien-1.jpg",
    author: "Shozo Shibuya",
    type: "TuDien",
  },
  {
    name: "Từ Điển Mỹ Học",
    image: "/src/assets/img/TuDien-2.jpg",
    author: "Nguyễn Văn Dân",
    type: "TuDien",
  },
  {
    name: "Từ Điển Triết Học Tây Phương - Từ Điển Triết Học Gadamer - The Gadamer Dictionary",
    image: "/src/assets/img/TuDien-3.jpg",
    author: "Chris Lawn, Niall Keane",
    type: "TuDien",
  },
  {
    name: "Từ Điển Cuộc Đời",
    image: "/src/assets/img/TuDien-4.jpg",
    author: "Hàn Mai",
    type: "TuDien",
  },
]);

const chooseListBook = ref([
  {
    name: "Tất cả",
    type: "All"
  },
  {
    name: "Truyện tranh",
    type: "TruyenTranh"
  },
  {
    name: "Tiểu thuyết",
    type: "TieuThuyet",
  },
  {
    name: "Từ điểm",
    type: "TuDien"
  }
])

const isOpen = ref(false);
const toggleDropDownOpen = () => {
  isOpen.value = !isOpen.value;
};

const selectedType = ref(null);
const selectTypeBook = (type) => {
  selectedType.value = type;
};

const filteredBooks = computed(() => {
  if (selectedType.value === "All") {
    return listBooks.value;
  } else {
    return listBooks.value.filter((book) => book.type === selectedType.value);
  }
});

onMounted(() => {
  selectedType.value = "All";
});
</script>
<template>
  <div class="relative font-sans overflow-hidden min-h-screen">
    <Header />
    <div class="relative pb-28">
      <div class="lg:pt-24 lg:px-10 p-4">
        <div class="flex flex-col gap-7 xl:flex-row bg-[#00697F] text-white p-10 rounded-2xl shadow-md overflow-hidden">
          <div class="xl:w-[50%] w-full flex flex-col xl:items-start justify-center space-y-4">
            <p class="font-bold lg:text-2xl text-xl text-center">
              JeiKei Library
            </p>
            <h1 class="font-bold lg:text-[50px] text-[30px] text-center xl:text-start">
              Online BookStore
            </h1>
            <p class="text-sm lg:text-lg font-medium text-black text-center xl:text-left">
              Nếu bạn là một người yêu thích việc đọc sách thì website này chính
              là nơi để bạn thõa mãn được đam mê của mình. JeiKei Library - nơi
              những cuốn sách trở nên sống động và ý nghĩa hơn bao giờ hết.
            </p>
            <p class="text-sm lg:text-lg font-medium text-black text-center">
              Liên hệ: <span class="text-white">079-965-8592</span>
            </p>
            <button
              class="lg:px-8 lg:py-4 px-6 py-4 bg-white text-[#00697F] text-base lg:text-xl font-semibold rounded-xl shadow-md">
              Read More
            </button>
          </div>
          <div class="w-full flex items-center justify-center">
            <img v-for="(img, index) in images" class="lg:w-[270px] w-[150px]"
              :class="{ 'lg:w-[320px] w-[190px]': index % 2 !== 0 }" :key="index" :src="img" alt="" />
          </div>
        </div>
      </div>
      <div class="flex xl:flex-row flex-col justify-center gap-4 lg:gap-8 lg:pt-10 lg:px-10 p-4">
        <div class="w-[20%] hidden xl:block flex-col py-1 px-2">
          <h2 class="py-2 flex items-center gap-2 text-[#333f48]">
            <i class="fa-solid fa-book-open text-[#00697F]"></i>
            <strong>Phân loại sách</strong>
          </h2>
          <hr class="border border-[#333f48] rounded-full" />
          <ul>
            <li v-for="(listChoice, index) in chooseListBook" :key="index" @click="selectTypeBook(listChoice.type)"
              class="py-[6px] px-3 text-[#333f48] border border-1 cursor-pointer hover:border-[#00697F] hover:text-[#00697F] transition-all duration-100 my-3">
              {{ listChoice.name }}
            </li>
          </ul>
        </div>
        <div class="relative block xl:hidden w-full">
          <div @click="toggleDropDownOpen"
            class="relative border border-[#a3a3a3] rounded py-1 px-2 cursor-pointer clickdown">
            <div class="flex items-center justify-between">
              <h2 class="py-2 flex items-center gap-2 text-[#333f48]">
                <i class="fa-solid fa-book-open text-[#00697F]"></i><strong> Phân loại sách</strong>
              </h2>
              <i class="fa-solid fa-caret-down ease-out duration-500" :class="isOpen ? 'rotate-0' : 'rotate-180'"></i>
            </div>
          </div>
          <ul v-show="isOpen"
            class="absolute top-[120%] left-0 z-40 w-full bg-[#fff] p-3 rounded-lg shadow border-2 border-[#a3a3a3]">
            <li v-for="(listChoice, index) in chooseListBook" :key="index" @click="selectTypeBook(listChoice.type)"
              class="mt-1 text-[#333f48] py-2 px-3 cursor-pointer hover:text-[#00697F] mb-1 font-semibold transition-all duration-200">
              {{ listChoice.name }}
              <hr class="bg-[#00697F] my-2" />
            </li>
          </ul>
        </div>
        <div
          class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-4 text-[#333f48]">
          <div v-for="(book, index) in filteredBooks" :key="index"
            class="flex flex-col items-center border border-gray-300 rounded-lg cursor-pointer shadow-lg p-4 transition-transform duration-300 hover:shadow-xl hover:scale-105">
            <img :src="book.image" class="w-48 h-72 object-cover rounded-md mb-2" alt="Book Cover" />
            <div class="text-center">
              <div class="w-60 whitespace-nowrap text-ellipsis overflow-hidden text-center">
                <a href="" class="text-lg font-semibold hover:text-[#00697F] transition-all duration-300">{{ book.name
                  }}</a>
              </div>
              <div class="w-60 whitespace-nowrap text-ellipsis overflow-hidden text-center my-2">
                <a href="" class="text-lg font-medium">{{ book.author }}</a>
              </div>
            </div>
            <a href="#"
              class="bg-[#00697F] text-white text-lg font-semibold py-2 px-4 rounded-md transition-all duration-300 hover:bg-[#055565]">
              Thêm Giỏ Hàng <i class="fa-solid fa-cart-shopping"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style></style>