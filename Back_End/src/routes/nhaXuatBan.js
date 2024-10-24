// Importing the express module to create a router
const express = require("express");
// Creating a new router instance
const router = express.Router();
// Importing the nhaXuatBanController to handle the routes
const nhaXuatBanController = require("../controllers/nhaXuatBanController");

// Route to get all NhaXuatBan (publishers)
router.get("/", nhaXuatBanController.getAllNhaXuatBan);

// Route to create a new NhaXuatBan (publisher)
router.post("/", nhaXuatBanController.createNhaXuatBan);

// Route to update an existing NhaXuatBan (publisher) by ID
router.put("/:id", nhaXuatBanController.updateNhaXuatBan);

// Route to delete an existing NhaXuatBan (publisher) by ID
router.delete("/:id", nhaXuatBanController.deleteNhaXuatBan);

// Exporting the router to be used in other parts of the application
module.exports = router;
