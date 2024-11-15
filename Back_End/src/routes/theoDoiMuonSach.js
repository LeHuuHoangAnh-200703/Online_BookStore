const express = require("express");
const router = express.Router();
const theoDoiMuonSachController = require("../controllers/theoDoiMuonSachController");

router.post("/", theoDoiMuonSachController.createTheoDoiMuonSach);
router.get("/", theoDoiMuonSachController.getTheoDoiMuonSach);
router.get("/:id", theoDoiMuonSachController.getTheoDoiMuonSachID);
router.put("/:id", theoDoiMuonSachController.updateTheoDoiMuonSach);
router.delete("/:id", theoDoiMuonSachController.deleteTheoDoiMuonSach);
router.patch("/:id", theoDoiMuonSachController.updateStatus);
router.get('/docgia/:MaDocGia', theoDoiMuonSachController.getTheoDoiMuonSachByDocGia);

module.exports = router;