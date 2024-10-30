const express = require("express");
const router = express.Router();
const nhanvienController = require("../controllers/nhanvienController");

router.post("/login", nhanvienController.login);
router.get("/", nhanvienController.getAllNhanVien);
router.post("/", nhanvienController.createNhanVien);
router.put("/:id", nhanvienController.updateNhanVien);
router.delete("/:id", nhanvienController.deleteNhanVien);

module.exports = router;