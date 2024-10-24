<template>
  <div id="app">
    <nav>
      <router-link to="/docgia">Doc Gia</router-link>
      <router-link to="/sach">Sach</router-link>
      <router-link to="/nhanvien">Nhan Vien</router-link>
      <router-link to="/nhaxuatban">Nha Xuat Ban</router-link>
      <router-link to="/theodoimuonsach">Theo Doi Muon Sach</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  display: flex;
  gap: 10px;
}
</style>