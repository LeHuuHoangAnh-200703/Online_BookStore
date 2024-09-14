<script setup>
import { ref } from 'vue';

const images = ref(['/src/assets/img/home-book-4.png', '/src/assets/img/home-book-2.png', '/src/assets/img/home-book-3.png']);
</script>
<template>
  <div class="lg:py-20 lg:px-24 p-4">
    <div class="flex flex-col gap-7 lg:flex-row bg-[#4169E1] text-white p-10 rounded-2xl shadow-md overflow-hidden">
      <div class="lg:w-[40%] w-full flex flex-col lg:items-start justify-center space-y-4">
        <p class="font-bold lg:text-2xl text-xl text-center">JeiKei Library</p>
        <h1 class="font-bold lg:text-[50px] text-[30px] text-center">Online BookStore</h1>
        <p class="text-sm lg:text-lg font-medium text-black text-center lg:text-left">
          Nếu bạn là một người yêu thích việc đọc sách thì website này chính là
          nơi để bạn thõa mãn được đam mê của mình. JeiKei Library - nơi những
          cuốn sách trở nên sống động và ý nghĩa hơn bao giờ hết.
        </p>
        <p class="text-sm lg:text-lg font-medium text-black text-center">Liên hệ: <span class="text-white">079-965-8592</span></p>
        <button class="lg:px-8 lg:py-4 px-6 py-4 bg-white text-[#4169E1] text-base lg:text-xl font-semibold rounded-xl shadow-md">Read More</button>
      </div>
      <div class="w-full flex items-center justify-center">
        <img v-for="(img, index) in images" class="lg:w-[300px] w-[150px]" :class="{ 'lg:w-[340px] w-[190px]': index % 2 !== 0 }" :key="index" :src="img" alt="">    
      </div>
    </div>
  </div>
</template>

<style>
</style>