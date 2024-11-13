const express = require("express");
const router = express.Router();
const docgiaController = require("../controllers/docgiaController");

router.get("/", docgiaController.getAllDocgia);
router.get("/:maDocGia", docgiaController.getDocGia);
router.post("/", docgiaController.createDocgia);
router.put("/:maDocGia", docgiaController.updateDocgia);
router.delete("/:maDocGia", docgiaController.deleteDocgia);
router.post("/login", docgiaController.login);

module.exports = router;