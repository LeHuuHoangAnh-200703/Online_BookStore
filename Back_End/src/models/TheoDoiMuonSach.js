const mongoose = require("mongoose");

const theoDoiMuonSachSchema = new mongoose.Schema({
  MaDocGia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Docgia",
    required: true,
  },
  MaSach: { type: mongoose.Schema.Types.ObjectId, ref: "Sach", required: true },
  NgayMuon: { type: Date, required: true, default: Date.now },
  NgayTra: { type: Date }, // Ngày trả có thể null khi chưa trả sách
});

module.exports = mongoose.model("Theo_Doi_Muon_Sach", theoDoiMuonSachSchema);
