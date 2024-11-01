const Docgia = require("../models/DocGia");
const bcrypt = require("bcrypt");

exports.getAllDocgia = async (req, res) => {
  try {
    const docgias = await Docgia.find();
    res.status(200).json(docgias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createDocgia = async (req, res) => {
  const docgia = new Docgia(req.body);
  try {
    await docgia.save();
    res.status(201).json(docgia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getDocGia = async (req, res) => {
  try {
    const docgia = await Docgia.findOne({ MaDocGia : req.params.maDocGia});
    if (!docgia) {
      return res.status(404).json({ message: "Đọc giả không tồn tại" });
    }
    res.status(200).json(docgia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.updateDocgia = async (req, res) => {
  try {
    const docGia = await Docgia.findOneAndUpdate({MaDocGia : req.params.maDocGia});
    docGia.HoLot = req.body.HoLot || docGia.HoLot;
    docGia.Ten = req.body.Ten || docGia.Ten;
    docGia.NgaySinh = req.body.NgaySinh || docGia.NgaySinh;
    docGia.Phai = req.body.Phai || docGia.Phai;
    docGia.DiaChi = req.body.DiaChi || docGia.DiaChi;
    docGia.DienThoai = req.body.DienThoai || docGia.DienThoai;
    const updatedDocGia = await docGia.save();
    res.status(200).json(updatedDocGia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteDocgia = async (req, res) => {
  try {
    const docgia = await Docgia.findOneAndDelete({ MaDocGia: req.params.maDocGia });
    if (docgia.deletedCount === 0) {
      return res.status(404).json({ message: "Đọc giả không tồn tại." });
    }
    res.status(200).json({ message: "Độc giả đã được xóa" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};