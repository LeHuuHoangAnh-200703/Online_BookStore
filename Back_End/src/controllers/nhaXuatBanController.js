const NhaXuatBan = require("../models/NhaXuatBan");

// Lấy tất cả nhà xuất bản
// Function to get all NhaXuatBan (publishers)
exports.getAllNhaXuatBan = async (req, res) => {
  try {
    // Fetch all NhaXuatBan documents from the database
    const nhaXuatBans = await NhaXuatBan.find();
    // Respond with status 200 (OK) and the list of NhaXuatBan
    res.status(200).json(nhaXuatBans);
  } catch (err) {
    // If an error occurs, respond with status 500 (Internal Server Error) and the error message
    res.status(500).json({ message: err.message });
  }
};

// Function to create a new NhaXuatBan (publisher)
exports.createNhaXuatBan = async (req, res) => {
  // Create a new NhaXuatBan instance with the data from the request body
  const nhaXuatBan = new NhaXuatBan(req.body);
  try {
    // Save the new NhaXuatBan instance to the database
    await nhaXuatBan.save();
    // Respond with status 201 (Created) and the newly created NhaXuatBan object
    res.status(201).json(nhaXuatBan);
  } catch (err) {
    // If an error occurs, respond with status 400 (Bad Request) and the error message
    res.status(400).json({ message: err.message });
  }
};

// Function to update an existing NhaXuatBan (publisher) by ID
exports.updateNhaXuatBan = async (req, res) => {
  try {
    // Find the NhaXuatBan by ID and update it with the data from the request body
    const updatedNhaXuatBan = await NhaXuatBan.findByIdAndUpdate(
      req.params.id, // ID of the NhaXuatBan to update
      req.body, // Data to update the NhaXuatBan with
      { new: true } // Option to return the updated document
    );
    // Respond with status 200 (OK) and the updated NhaXuatBan object
    res.status(200).json(updatedNhaXuatBan);
  } catch (err) {
    // If an error occurs, respond with status 400 (Bad Request) and the error message
    res.status(400).json({ message: err.message });
  }
};
// Function to delete an existing NhaXuatBan (publisher) by ID
exports.deleteNhaXuatBan = async (req, res) => {
  try {
    // Find the NhaXuatBan by ID and delete it from the database
    await NhaXuatBan.findByIdAndDelete(req.params.id);
    // Respond with status 200 (OK) and a success message
    res.status(200).json({ message: "Nhà xuất bản đã được xóa" });
  } catch (err) {
    // If an error occurs, respond with status 500 (Internal Server Error) and the error message
    res.status(500).json({ message: err.message });
  }
};
