const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const docgiaSchema = new mongoose.Schema({
  MaDocGia: { type: String, unique: true },
  Ten: String,
  Email: String,
  Password: String,
  NgaySinh: Date,
  Phai: String,
  DiaChi: String,
  DienThoai: String,
  NgayTao: { type: Date, default: Date.now },
});

function generateMaDocGia() {  
  return 'DG' + Math.floor(10000 + Math.random() * 90000); 
}

// Middleware để hash mật khẩu trước khi lưu vào cơ sở dữ liệu
docgiaSchema.pre("save", async function (next) {
  // Kiểm tra xem mật khẩu đã được thay đổi hay không
  if (!this.isModified("Password")) return next();

  try {
    // Hash mật khẩu với độ khó là 10
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    if (!this.MaDocGia) {  
      this.MaDocGia = generateMaDocGia();  
    } 
    next();
  } catch (error) {
    next(error);
  }
});


module.exports = mongoose.model("Doc_Gia", docgiaSchema);