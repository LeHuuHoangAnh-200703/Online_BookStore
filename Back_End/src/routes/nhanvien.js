const express = require("express");
const router = express.Router();
const nhanvienController = require("../controllers/nhanvienController");

router.post("/login", nhanvienController.login);
router.get("/", nhanvienController.getAllNhanVien);
router.get("/:maNhanVien", nhanvienController.getNhanVien);
router.post("/", nhanvienController.createNhanVien);
router.put("/:maNhanVien", nhanvienController.updateNhanVien);
router.delete("/:maNhanVien", nhanvienController.deleteNhanVien);

module.exports = router;