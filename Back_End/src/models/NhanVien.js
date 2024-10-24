// Importing the mongoose module to interact with MongoDB
const mongoose = require("mongoose");

// Defining the schema for the NhanVien collection
const nhanvienSchema = new mongoose.Schema({
  MSNV: String,        // Employee ID
  HoTenNV: String,     // Employee full name
  Password: String,    // Employee password
  ChucVu: String,      // Employee position
  DiaChi: String,      // Employee address
  SoDienThoai: String, // Employee phone number
});

// Exporting the NhanVien model to be used in other parts of the application
module.exports = mongoose.model("Nhan_Vien", nhanvienSchema);