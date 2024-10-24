const mongoose = require("mongoose");

const sachSchema = new mongoose.Schema({
  MaSach: String,
  TenSach: String,
  DonGia: Number,
  SoQuyen: Number,
  NamXuatBan: Number,
  MaNXB: String,
  TacGia: String,
});

module.exports = mongoose.model("Sach", sachSchema);
