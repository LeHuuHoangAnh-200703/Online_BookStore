const Sach = require("../models/Sach");

// Lấy tất cả sách
// Function to get all Sach (books)
exports.getAllSach = async (req, res) => {
  try {
    // Fetch all Sach documents from the database
    const sachs = await Sach.find();
    // Respond with status 200 (OK) and the list of Sach
    res.status(200).json(sachs);
  } catch (err) {
    // If an error occurs, respond with status 500 (Internal Server Error) and the error message
    res.status(500).json({ message: err.message });
  }
};

// Function to create a new Sach (book)
exports.createSach = async (req, res) => {
  // Create a new Sach instance with the data from the request body
  const sach = new Sach(req.body);
  try {
    // Save the new Sach instance to the database
    await sach.save();
    // Respond with status 201 (Created) and the newly created Sach object
    res.status(201).json(sach);
  } catch (err) {
    // If an error occurs, respond with status 400 (Bad Request) and the error message
    res.status(400).json({ message: err.message });
  }
};

// Function to update an existing Sach (book) by ID
exports.updateSach = async (req, res) => {
  try {
    // Find the Sach by ID and update it with the data from the request body
    const updatedSach = await Sach.findByIdAndUpdate(
      req.params.id, // ID of the Sach to update
      req.body, // Data to update the Sach with
      { new: true } // Option to return the updated document
    );
    // Respond with status 200 (OK) and the updated Sach object
    res.status(200).json(updatedSach);
  } catch (err) {
    // If an error occurs, respond with status 400 (Bad Request) and the error message
    res.status(400).json({ message: err.message });
  }
};

// Function to delete an existing Sach (book) by ID
exports.deleteSach = async (req, res) => {
  try {
    // Find the Sach by ID and delete it from the database
    await Sach.findByIdAndDelete(req.params.id);
    // Respond with status 200 (OK) and a success message
    res.status(200).json({ message: "Sách đã được xóa" });
  } catch (err) {
    // If an error occurs, respond with status 500 (Internal Server Error) and the error message
    res.status(500).json({ message: err.message });
  }
};
