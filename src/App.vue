<template>
  <div id="app">
    <nav>
      <router-link to="/">Trang Chủ</router-link>
      <router-link to="/about">Giới Thiệu</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>
