// Importing required modules
const express = require("express");
const router = express.Router();
const nhanvienController = require("../controllers/nhanvienController");

// Route to get all NhanVien
router.get("/", nhanvienController.getAllNhanVien);

// Route to create a new NhanVien
router.post("/", nhanvienController.createNhanVien);

// Route to update an existing NhanVien by ID
router.put("/:id", nhanvienController.updateNhanVien);

// Route to delete an existing NhanVien by ID
router.delete("/:id", nhanvienController.deleteNhanVien);

// Exporting the router to be used in other parts of the application
module.exports = router;
