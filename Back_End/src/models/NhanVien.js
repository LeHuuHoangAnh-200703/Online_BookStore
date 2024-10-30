const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const nhanvienSchema = new mongoose.Schema({
  MSNV: String,
  HoTenNV: String,
  Password: String,
  ChucVu: String,
  DiaChi: String,
  DienThoai: String,
});

function generateMaNhanVien() {  
  return 'NV' + Math.floor(10000 + Math.random() * 90000); 
}

nhanvienSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    if (!this.MSNV) {  
      this.MSNV = generateMaNhanVien();  
    } 
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Nhan_Vien", nhanvienSchema);