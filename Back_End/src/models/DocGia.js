const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const docgiaSchema = new mongoose.Schema({
  MaDocGia: {
    type: Number,
    unique: true,
    required: true,
  },
  Ten: String,
  Email: String,
  Password: String,
  NgaySinh: Date,
  Phai: String,
  DiaChi: String,
  DienThoai: String,
  NgayTao: { type: Date, default: Date.now },
});

// Middleware để hash mật khẩu trước khi lưu vào cơ sở dữ liệu
docgiaSchema.pre("save", async function (next) {
  // Kiểm tra xem mật khẩu đã được thay đổi hay không
  if (!this.isModified("Password")) return next();

  try {
    // Hash mật khẩu với độ khó là 10
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);

    const lastDocGia = await this.constructor.findOne().sort({ MaDocGia: -1 });  
    this.MaDocGia = lastDocGia ? lastDocGia.MaDocGia + 1 : 1; // Nếu không có tài liệu nào, bắt đầu từ 1  
    next();
  } catch (error) {
    next(error);
  }
});


module.exports = mongoose.model("Doc_Gia", docgiaSchema);
