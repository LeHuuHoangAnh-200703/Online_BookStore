<template>
  <div class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50" v-if="isLoading">
    <div class="loader">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-[#00697F]"></div>
      <p class="mt-4 text-lg text-[#00697F]">Loading...</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>