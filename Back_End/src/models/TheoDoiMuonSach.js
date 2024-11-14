const mongoose = require("mongoose");

const TheoDoiMuonSachSchema = new mongoose.Schema({
  MaDocGia: { type: String, required: true },
  MaSach: { type: String, required: true },
  NgayMuon: { type: Date, required: true },
  NgayTra: { type: Date, required: false },
  SoLuong: { type: Number, required: true },
  TrangThai: { type: String, enum: ['Chưa trả', 'Quá hạn', 'Đã trả'], default: 'Chưa trả' }
});

module.exports = mongoose.model("TheoDoiMuonSach", TheoDoiMuonSachSchema);