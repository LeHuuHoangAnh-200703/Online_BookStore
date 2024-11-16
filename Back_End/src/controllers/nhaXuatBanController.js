const NhaXuatBan = require("../models/NhaXuatBan");
const Sach = require("../models/Sach");
exports.getAllNhaXuatBan = async (req, res) => {
  try {
    const nhaXuatBans = await NhaXuatBan.find();
    res.status(200).json(nhaXuatBans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getNhaXuatBan = async (req, res) => {
  try {
    const nhaXuatBan = await NhaXuatBan.findOne({MaNXB : req.params.maNXB});
    if (!nhaXuatBan) {
      return res.status(404).json({ message: 'Nhà xuất bản không tồn tại.' });
    }
    res.status(200).json(nhaXuatBan);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

exports.createNhaXuatBan = async (req, res) => {
  const nhaXuatBan = new NhaXuatBan(req.body);
  try {
    await nhaXuatBan.save();
    res.status(201).json(nhaXuatBan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateNhaXuatBan = async (req, res) => {
  try {
    const nhaXuatBan = await NhaXuatBan.findOne({MaNXB : req.params.maNXB});
    nhaXuatBan.TenNXB = req.body.TenNXB || nhaXuatBan.TenNXB;
    nhaXuatBan.DiaChi = req.body.DiaChi || nhaXuatBan.DiaChi;
    const updatedNXB = await nhaXuatBan.save();
    res.status(200).json(updatedNXB);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteNhaXuatBan = async (req, res) => {
  const { maNXB } = req.params;
  try {
    const existingBooks = await Sach.findOne({ MaNXB: maNXB });
    if (existingBooks) {
      return res.status(400).json({ message: "Không thể xóa nhà xuất bản vì nó đang được sử dụng trong sách." });
    }

    const nhaXuatBan = await NhaXuatBan.findOneAndDelete({ MaNXB: maNXB });
    if (!nhaXuatBan) {
      return res.status(404).json({ message: "Nhà xuất bản không tồn tại." });
    }
    res.status(200).json({ message: "Nhà xuất bản đã được xóa" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};