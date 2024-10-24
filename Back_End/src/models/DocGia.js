const mongoose = require("mongoose");

const docgiaSchema = new mongoose.Schema({
  MaDocGia: String,
  HoLot: String,
  Ten: String,
  NgaySinh: Date,
  Phai: String,
  DiaChi: String,
  DienThoai: String,
});

module.exports = mongoose.model("Doc_Gia", docgiaSchema);
