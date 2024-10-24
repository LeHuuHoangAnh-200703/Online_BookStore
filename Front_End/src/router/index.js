import Vue from "vue";
import Router from "vue-router";
import DocGia from "../components/DocGia.vue";
import Sach from "../components/Sach.vue";
import NhanVien from "../components/NhanVien.vue";
import NhaXuatBan from "../components/NhaXuatBan.vue";
import TheoDoiMuonSach from "../components/TheoDoiMuonSach.vue";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/docgia", component: DocGia },
    { path: "/sach", component: Sach },
    { path: "/nhanvien", component: NhanVien },
    { path: "/nhaxuatban", component: NhaXuatBan },
    { path: "/theodoimuonsach", component: TheoDoiMuonSach },
  ],
});
