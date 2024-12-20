const Docgia = require("../models/DocGia");
const bcrypt = require("bcrypt");
const TheoDoiMuonSach = require("../models/TheoDoiMuonSach");
exports.getAllDocgia = async (req, res) => {
  try {
    const docgias = await Docgia.find();
    res.status(200).json(docgias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createDocgia = async (req, res) => {
  const { DienThoai } = req.body;
  const docgia = new Docgia(req.body);
  try {
    const existingDocGia = await Docgia.findOne({ DienThoai });
    if (existingDocGia) {
      return res.status(400).json({ message: "Số điện thoại đã được đăng ký." });
    }
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
    const docGia = await Docgia.findOne({ MaDocGia: req.params.maDocGia });
    if (!docGia) {
      return res.status(404).json({ message: "Đọc giả không tồn tại" });
    }

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
  const { maDocGia } = req.params;
  try {
    const existingOrder = await TheoDoiMuonSach.findOne({ MaDocGia: maDocGia });
    if (existingOrder) {
      return res.status(400).json({ message: "Không thể xóa đọc giả vì họ đang có đơn mượn sách." });
    }

    const docgia = await Docgia.findOneAndDelete({ MaDocGia: maDocGia });
    if (!docgia) {
      return res.status(404).json({ message: "Đọc giả không tồn tại." });
    }
    res.status(200).json({ message: "Đọc giả đã được xóa" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const docgia = await Docgia.findOne({ DienThoai: phone });
    if (!docgia) {
      return res.status(400).json({ message: "Số điện thoại không tồn tại." });
    }

    const isMatch = await bcrypt.compare(password, docgia.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng." });
    }
    return res.status(200).json({ message: "Đăng nhập thành công!",
      docgia: {
        MaDocGia: docgia.MaDocGia,
        HoLot: docgia.HoLot,
        Ten: docgia.Ten,
        NgaySinh: docgia.NgaySinh,
        Phai: docgia.Phai,
        DiaChi: docgia.DiaChi,
        DienThoai: docgia.DienThoai,
      }, });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại." });
  }
};