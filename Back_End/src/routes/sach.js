// Importing the express module to create a router
const express = require("express");
// Creating a new router instance
const router = express.Router();
// Importing the sachController to handle the routes
const sachController = require("../controllers/sachController");

// Route to get all Sach (books)
router.get("/", sachController.getAllSach);

// Route to create a new Sach (book)
router.post("/", sachController.createSach);

// Route to update an existing Sach (book) by ID
router.put("/:id", sachController.updateSach);

// Route to delete an existing Sach (book) by ID
router.delete("/:id", sachController.deleteSach);

// Exporting the router to be used in other parts of the application
module.exports = router;
