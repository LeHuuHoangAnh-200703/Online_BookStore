const express = require("express");
// Creating a new router instance
const router = express.Router();
// Importing the docgiaController to handle the routes
const docgiaController = require("../controllers/docgiaController");

router.post("/login", docgiaController.login);
// Route to get all DocGia (readers)
router.get("/", docgiaController.getAllDocgia);
router.get("/current", docgiaController.verifyToken, docgiaController.getCurrentUser);
// Route to create a new DocGia (reader)
router.post("/", docgiaController.createDocgia);
// Route to update an existing DocGia (reader) by ID
router.put("/:id", docgiaController.updateDocgia);

// Route to delete an existing DocGia (reader) by ID
router.delete("/:id", docgiaController.deleteDocgia);
// Exporting the router to be used in other parts of the application
module.exports = router;