const express = require("express");
const router = express.Router();
const sachController = require("../controllers/sachController");

router.get("/", sachController.getAllSach);

router.get("/maSach/:maSach", sachController.getSachByMaSach);

router.post("/", sachController.upload, sachController.createSach);

router.put("/maSach/:maSach", sachController.upload, sachController.updateSach);

router.delete("/maSach/:maSach", sachController.deleteSach);

module.exports = router;