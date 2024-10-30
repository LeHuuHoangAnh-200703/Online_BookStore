const express = require("express");
const router = express.Router();
const docgiaController = require("../controllers/docgiaController");

router.post("/login", docgiaController.login);
router.get("/", docgiaController.getAllDocgia);
router.post("/", docgiaController.createDocgia);
router.put("/:id", docgiaController.updateDocgia);
router.delete("/:maDocGia", docgiaController.deleteDocgia);

module.exports = router;