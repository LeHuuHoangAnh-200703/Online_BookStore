// Importing the express module to create a router
const express = require("express");
// Creating a new router instance
const router = express.Router();
// Importing the theoDoiMuonSachController to handle the routes
const theoDoiMuonSachController = require("../controllers/theoDoiMuonSachController");

// Route to handle borrowing a book (mượn sách)
router.post("/muon", theoDoiMuonSachController.muonSach);

// Route to handle returning a book (trả sách)
router.post("/tra", theoDoiMuonSachController.traSach);

// Exporting the router to be used in other parts of the application
module.exports = router;