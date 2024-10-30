const mongoose = require("mongoose");

const sachSchema = new mongoose.Schema({
  MaSach: String,
  MaNXB: String,
  TenSach: String,
  DonGia: Number,
  SoQuyen: Number,
  NamXuatBan: Number,
  TacGia: String,
  Type: String,
  MoTa: String,
  Image: String,
});

module.exports = mongoose.model("Sach", sachSchema);