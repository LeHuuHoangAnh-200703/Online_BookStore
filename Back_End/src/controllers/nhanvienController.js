const NhanVien = require("../models/NhanVien");
const bcrypt = require("bcrypt");
exports.getAllNhanVien = async (req, res) => {
  try {
    const nhanviens = await NhanVien.find();
    res.status(200).json(nhanviens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createNhanVien = async (req, res) => {
  const nhanvien = new NhanVien(req.body);
  try {
    await nhanvien.save();
    res.status(201).json(nhanvien);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateNhanVien = async (req, res) => {
  try {
    const updatedNhanVien = await NhanVien.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedNhanVien);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteNhanVien = async (req, res) => {
  try {
    await NhanVien.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Nhân viên đã được xóa" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const admin = await NhanVien.findOne({ DienThoai: phone});
    if (!admin) {
      return res.status(400).json({ message: "Số điện thoại không tồn tại." });
    }

    const isMatch = await bcrypt.compare(password, admin.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng." });
    }
    return res.status(200).json({ message: "Đăng nhập thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại." });
  }
};