const express = require("express");
const router = express.Router();
const nhaXuatBanController = require("../controllers/nhaXuatBanController");

router.get("/", nhaXuatBanController.getAllNhaXuatBan);

router.get("/:maNXB", nhaXuatBanController.getNhaXuatBan);

router.post("/", nhaXuatBanController.createNhaXuatBan);

router.put("/:maNXB", nhaXuatBanController.updateNhaXuatBan);

router.delete("/:maNXB", nhaXuatBanController.deleteNhaXuatBan);

module.exports = router;
