const Sach = require("../models/Sach");
const NhaXuatBan = require("../models/NhaXuatBan");
const path = require('path');
const multer = require('multer');
const TheoDoiMuonSach = require('../models/TheoDoiMuonSach');

const storagePath = path.join(__dirname, '../../../Front_End/src/assets/img');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storagePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
exports.getAllSach = async (req, res) => {
  try {
    const sachs = await Sach.find();
    res.status(200).json(sachs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSachByMaSach = async (req, res) => {  
  try {  
    const sach = await Sach.findOne({ MaSach: req.params.maSach });

    if (!sach) {  
      return res.status(404).json({ message: "Sách không tồn tại" });  
    }  
    res.status(200).json(sach);  
  } catch (err) {  
    res.status(500).json({ message: err.message });  
  }  
};  

exports.createSach = async (req, res) => {
  const { MaNXB } = req.body;
  const sach = new Sach({
    MaSach: req.body.MaSach,
    MaNXB: req.body.MaNXB,
    TenSach: req.body.TenSach,
    DonGia: req.body.DonGia,
    SoQuyen: req.body.SoQuyen,
    NamXuatBan: req.body.NamXuatBan,
    TacGia: req.body.TacGia,
    Type: req.body.Type,
    MoTa: req.body.MoTa,
    Image: req.file ? `/assets/img/${req.file.filename}` : '',
  });

  try {
    const nhaxuatban = await NhaXuatBan.findOne({ MaNXB: MaNXB });
    if (!nhaxuatban) {
      return res.status(400).json({ message: "Mã nhà xuất bản không tồn tại!" });
    }
    await sach.save();
    res.status(201).json(sach);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateSach = async (req, res) => {
  const { MaNXB } = req.body;
  try {
    const sach = await Sach.findOne({ MaSach: req.params.maSach });
    const nhaxuatban = await NhaXuatBan.findOne({ MaNXB: MaNXB });

    if (!nhaxuatban) {
      return res.status(400).json({ message: "Mã nhà xuất bản không tồn tại!" });
    }
    if (!sach) {
      return res.status(404).json({ message: "Sách không tồn tại." });
    }

    sach.MaNXB = req.body.MaNXB || sach.MaNXB;
    sach.TenSach = req.body.TenSach || sach.TenSach;
    sach.DonGia = req.body.DonGia || sach.DonGia;
    sach.SoQuyen = req.body.SoQuyen || sach.SoQuyen;
    sach.NamXuatBan = req.body.NamXuatBan || sach.NamXuatBan;
    sach.TacGia = req.body.TacGia || sach.TacGia;
    sach.Type = req.body.Type || sach.Type;
    sach.MoTa = req.body.MoTa || sach.MoTa;

    if (req.file) {
      sach.Image = `/assets/img/${req.file.filename}`;
    }
    const updatedSach = await sach.save();

    res.status(200).json(updatedSach);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSach = async (req, res) => {
    const { maSach } = req.params;
    try {
        const existingOrder = await TheoDoiMuonSach.findOne({ MaSach: maSach });
        if (existingOrder) {
            return res.status(400).json({ message: "Không thể xóa sách vì nó đang nằm trong đơn mượn sách." });
        }

        const sach = await Sach.findOneAndDelete({ MaSach: maSach });
        if (!sach) {
            return res.status(404).json({ message: "Sách không tồn tại." });
        }
        res.status(200).json({ message: "Sách đã được xóa" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.upload = upload.single('Image');