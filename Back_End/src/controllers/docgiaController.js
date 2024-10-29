const Docgia = require("../models/DocGia");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Function to get all DocGia (readers)
exports.getAllDocgia = async (req, res) => {
  try {
    // Fetch all DocGia documents from the database
    const docgias = await Docgia.find();
    // Respond with status 200 (OK) and the list of DocGia
    res.status(200).json(docgias);
  } catch (err) {
    // If an error occurs, respond with status 500 (Internal Server Error) and the error message
    res.status(500).json({ message: err.message });
  }
};

// Tạo mới độc giả
// Function to create a new DocGia (reader)
exports.createDocgia = async (req, res) => {
  // Create a new DocGia instance with the data from the request body
  const docgia = new Docgia(req.body);
  try {
    // Save the new DocGia instance to the database
    await docgia.save();
    // Respond with status 201 (Created) and the newly created DocGia object
    res.status(201).json(docgia);
  } catch (err) {
    // If an error occurs, respond with status 400 (Bad Request) and the error message
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật độc giả
// Function to update an existing DocGia (reader) by ID
exports.updateDocgia = async (req, res) => {
  try {
    // Find the DocGia by ID and update it with the data from the request body
    const updatedDocgia = await Docgia.findByIdAndUpdate(
      req.params.id, // ID of the DocGia to update
      req.body, // Data to update the DocGia with
      { new: true } // Option to return the updated document
    );
    // Respond with status 200 (OK) and the updated DocGia object
    res.status(200).json(updatedDocgia);
  } catch (err) {
    // If an error occurs, respond with status 400 (Bad Request) and the error message
    res.status(400).json({ message: err.message });
  }
};

// Function to delete an existing DocGia (reader) by ID
exports.deleteDocgia = async (req, res) => {
  try {
    // Find the DocGia by ID and delete it from the database
    await Docgia.findByIdAndDelete(req.params.id);
    // Respond with status 200 (OK) and a success message
    res.status(200).json({ message: "Độc giả đã được xóa" });
  } catch (err) {
    // If an error occurs, respond with status 500 (Internal Server Error) and the error message
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Tìm người dùng theo email
    const user = await Docgia.findOne({ Email: email });
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại.' });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không đúng.' });
    }
    const token = jwt.sign({ id: user._id }, 'hoanganh200703', { expiresIn: '1h' }); // Thay đổi secret key cho bảo mật
    return res.status(200).json({ token, message: 'Đăng nhập thành công!' }); // Gửi token và thông báo
  } catch (error) {
    res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại.' });
  }
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Không có token, truy cập bị từ chối.' });
  }

  jwt.verify(token, 'hoanganh200703', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token không hợp lệ.' });
    }
    req.userId = decoded.id; // Lưu ID người dùng vào request
    next();
  });
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await Docgia.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại.' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};