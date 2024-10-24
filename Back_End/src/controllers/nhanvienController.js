const NhanVien = require("../models/NhanVien");

// Lấy tất cả nhân viên
exports.getAllNhanVien = async (req, res) => {
  try {
    const nhanviens = await NhanVien.find();
    res.status(200).json(nhanviens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to create a new employee (NhanVien)
exports.createNhanVien = async (req, res) => {
  // Create a new NhanVien instance with the data from the request body
  const nhanvien = new NhanVien(req.body);
  try {
    // Save the new NhanVien instance to the database
    await nhanvien.save();
    // Respond with status 201 (Created) and the newly created NhanVien object
    res.status(201).json(nhanvien);
  } catch (err) {
    // If an error occurs, respond with status 400 (Bad Request) and the error message
    res.status(400).json({ message: err.message });
  }
};

// Function to update an existing employee (NhanVien)
exports.updateNhanVien = async (req, res) => {
  try {
    // Find the NhanVien by ID and update it with the data from the request body
    const updatedNhanVien = await NhanVien.findByIdAndUpdate(
      req.params.id, // ID of the NhanVien to update
      req.body, // Data to update the NhanVien with
      { new: true } // Option to return the updated document
    );
    // Respond with status 200 (OK) and the updated NhanVien object
    res.status(200).json(updatedNhanVien);
  } catch (err) {
    // If an error occurs, respond with status 400 (Bad Request) and the error message
    res.status(400).json({ message: err.message });
  }
};

// Function to delete an existing employee (NhanVien)
exports.deleteNhanVien = async (req, res) => {
  try {
    // Find the NhanVien by ID and delete it from the database
    await NhanVien.findByIdAndDelete(req.params.id);
    // Respond with status 200 (OK) and a success message
    res.status(200).json({ message: "Nhân viên đã được xóa" });
  } catch (err) {
    // If an error occurs, respond with status 500 (Internal Server Error) and the error message
    res.status(500).json({ message: err.message });
  }
};
