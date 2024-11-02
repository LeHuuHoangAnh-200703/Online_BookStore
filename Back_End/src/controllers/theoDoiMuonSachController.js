const TheoDoiMuonSach = require("../models/TheoDoiMuonSach");
const Docgia = require("../models/DocGia");
const Sach = require("../models/Sach");

exports.createTheoDoiMuonSach = async (req, res) => {
  const { MaDocGia, MaSach, NgayMuon, NgayTra } = req.body;

  try {
    const docGia = await Docgia.findOne({ MaDocGia: MaDocGia });
    if (!docGia) {
      return res.status(400).json({ message: "Mã đọc giả không tồn tại!" });
    }

    const sach = await Sach.findOne({ MaSach: MaSach });
    if (!sach) {
      return res.status(400).json({ message: "Mã sách không tồn tại!" });
    }

    const theoDoiMuonSach = new TheoDoiMuonSach({
      MaDocGia,
      MaSach,
      NgayMuon,
      NgayTra,
    });

    const savedTheoDoiMuonSach = await theoDoiMuonSach.save();
    res.status(201).json(savedTheoDoiMuonSach);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTheoDoiMuonSach = async (req, res) => {
  try {
    const theodoimuonsach = await TheoDoiMuonSach.find();
    res.json(theodoimuonsach);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTheoDoiMuonSachID = async (req, res) => {
  try {
    const theodoimuonsach = await TheoDoiMuonSach.findById(req.params.id);
    res.json(theodoimuonsach);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTheoDoiMuonSach = async (req, res) => {
  const { MaDocGia, MaSach } = req.body;
  try {
    const docGia = await Docgia.findOne({ MaDocGia: MaDocGia });
    if (!docGia) {
      return res.status(400).json({ message: "Mã đọc giả không tồn tại!" });
    }

    const sach = await Sach.findOne({ MaSach: MaSach });
    if (!sach) {
      return res.status(400).json({ message: "Mã sách không tồn tại!" });
    }

    const updatedTheoDoiMuonSach = await TheoDoiMuonSach.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTheoDoiMuonSach);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTheoDoiMuonSach = async (req, res) => {
  try {
    await TheoDoiMuonSach.findByIdAndDelete(req.params.id);
    res.json({ message: "TheoDoiMuonSach deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const updatedOrder = await TheoDoiMuonSach.findByIdAndUpdate(req.params.id, { TrangThai: req.body.TrangThai }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Thông tin mượn sách không tồn tại!" });
    }
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};