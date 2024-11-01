const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const docgiaSchema = new mongoose.Schema({
  MaDocGia: { type: String, unique: true },
  HoLot: String,
  Ten: String,
  NgaySinh: Date,
  Phai: String,
  DiaChi: String,
  DienThoai: String,
});

module.exports = mongoose.model("Doc_Gia", docgiaSchema);