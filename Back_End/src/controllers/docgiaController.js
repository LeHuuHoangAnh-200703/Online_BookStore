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

exports.updateDocgia = async (req, res) => {
  try {
    const updatedDocgia = await Docgia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedDocgia);
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

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Docgia.findOne({ Email: email });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại." });
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng." });
    }
    return res.status(200).json({ message: "Đăng nhập thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại." });
  }
};