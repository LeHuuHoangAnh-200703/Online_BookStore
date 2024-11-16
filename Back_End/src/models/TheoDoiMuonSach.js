const mongoose = require("mongoose");

const TheoDoiMuonSachSchema = new mongoose.Schema({
  MaDocGia: { type: String, required: true },
  MaSach: { type: String, required: true },
  NgayMuon: { type: Date, required: true },
  NgayTra: { type: Date, required: false },
  SoLuong: { type: Number, required: true },
  TongTien: { type: Number, required: true },
  TrangThai: { type: String, enum: ['Chưa trả', 'Quá hạn', 'Đã trả'], default: 'Chưa trả' },
  TrangThaiDuyet: { type: String, enum: ['Đang chờ duyệt', 'Đã duyệt', 'Không được duyệt'], default: 'Đang chờ duyệt' }
});

module.exports = mongoose.model("TheoDoiMuonSach", TheoDoiMuonSachSchema);