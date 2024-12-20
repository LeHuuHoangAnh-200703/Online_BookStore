const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const docgiaSchema = new mongoose.Schema({
  MaDocGia: String,
  HoLot: String,
  Ten: String,
  NgaySinh: Date,
  Phai: String,
  DiaChi: String,
  DienThoai: String,
  Password: String,
});

function generateMaDocGia() {  
  return 'DG' + Math.floor(10000 + Math.random() * 90000); 
}

docgiaSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();

  try {
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