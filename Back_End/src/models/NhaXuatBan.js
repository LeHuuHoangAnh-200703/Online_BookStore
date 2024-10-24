const mongoose = require("mongoose");

const nhaXuatBanSchema = new mongoose.Schema({
  MaNXB: String,
  TenNXB: String,
  DiaChi: String,
});

module.exports = mongoose.model("Nha_Xuat_Ban", nhaXuatBanSchema);
