<template>
  <div id="app">
    <Loading :isLoading="isLoading" />
      <router-view></router-view>
  </div>
</template>

<script setup>
import Loading from '../../Front_End/src/components/home/Loading.vue';
import { isLoading } from '@/router';
</script>
