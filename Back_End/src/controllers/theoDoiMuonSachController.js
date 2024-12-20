const TheoDoiMuonSach = require("../models/TheoDoiMuonSach");
const Docgia = require("../models/DocGia");
const Sach = require("../models/Sach");

exports.createTheoDoiMuonSach = async (req, res) => {
  const { MaDocGia, MaSach, NgayTra, SoLuong } = req.body;

  try {
    const docGia = await Docgia.findOne({ MaDocGia: MaDocGia });

    const danhSachMuon = await TheoDoiMuonSach.find({
      MaDocGia: MaDocGia,
      TrangThai: { $ne: "Đã trả" },
    });

    const tongSoLuongDangMuon = danhSachMuon.reduce((sum, item) => sum + item.SoLuong, 0);

    if (tongSoLuongDangMuon + SoLuong > 4) {
      return res.status(400).json({ message: "Bạn chỉ có thể mượn tối đa 4 quyển sách!" });
    }

    if (!docGia) {
      return res.status(400).json({ message: "Mã đọc giả không tồn tại!" });
    }

    const sach = await Sach.findOne({ MaSach: MaSach });
    if (!sach) {
      return res.status(400).json({ message: "Mã sách không tồn tại!" });
    }

    const checkBook = await TheoDoiMuonSach.findOne({
      MaSach: MaSach,
      MaDocGia: MaDocGia,
      TrangThai: { $ne: "Đã trả" },
    });

    if (checkBook) {
      return res.status(400).json({message: "Không thể mượn thêm vì sách này chưa được trả!"});
    }

    if (sach.SoQuyen < SoLuong) {
      return res.status(400).json({ message: "Số lượng sách không đủ!" });
    }
    
    const ngayMuon = new Date(); // Ngày mượn là ngày hiện tại
    const ngayTraDate = new Date(NgayTra); // Chuyển đổi Ngày trả thành đối tượng Date

    if (ngayTraDate < ngayMuon) {
      return res.status(400).json({ message: "Ngày trả không được trước ngày mượn!" });
    }

    const tongTien = sach.DonGia * SoLuong;

    const theoDoiMuonSach = new TheoDoiMuonSach({
      MaDocGia,
      MaSach,
      NgayMuon: new Date(),
      NgayTra,
      SoLuong,
      TongTien: tongTien,
      TrangThaiDuyet: 'Đang chờ duyệt'
    });
    const savedTheoDoiMuonSach = await theoDoiMuonSach.save();
    res.json(savedTheoDoiMuonSach);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTheoDoiMuonSach = async (req, res) => {
  try {
    const theodoimuonsach = await TheoDoiMuonSach.find();
    res.json(theodoimuonsach);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTheoDoiMuonSachID = async (req, res) => {
  try {
    const theodoimuonsach = await TheoDoiMuonSach.findById(req.params.id);
    res.status(201).json(theodoimuonsach);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTheoDoiMuonSach = async (req, res) => {
  const { MaDocGia, MaSach } = req.body;
  try {
    const docGia = await Docgia.findOne({ MaDocGia: MaDocGia });
    if (!docGia) {
      return res.status(400).json({ message: "Mã đọc giả không tồn tại!" });
    }

    const sach = await Sach.findOne({ MaSach: MaSach });
    if (!sach) {
      return res.status(400).json({ message: "Mã sách không tồn tại!" });
    }

    const updatedTheoDoiMuonSach = await TheoDoiMuonSach.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTheoDoiMuonSach);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTheoDoiMuonSach = async (req, res) => {
  try {
    await TheoDoiMuonSach.findByIdAndDelete(req.params.id);
    res.json({ message: "TheoDoiMuonSach deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { TrangThai } = req.body;
  try {
    const updatedOrder = await TheoDoiMuonSach.findByIdAndUpdate(req.params.id, { TrangThai: TrangThai }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Thông tin mượn sách không tồn tại!" });
    }

    if (TrangThai === 'Đã trả') {
      const sach = await Sach.findOne({ MaSach: updatedOrder.MaSach });
      if (sach) {
        sach.SoQuyen += updatedOrder.SoLuong;
        await sach.save();
      }
    }
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTheoDoiMuonSachByDocGia = async (req, res) => {
  const { MaDocGia } = req.params;
  try {
    const theodoimuonsach = await TheoDoiMuonSach.find({ MaDocGia: MaDocGia });
    if (theodoimuonsach.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn mượn sách nào cho mã đọc giả này!" });
    }
    res.json(theodoimuonsach);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approveOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedOrder = await TheoDoiMuonSach.findByIdAndUpdate(
      id,
      { TrangThaiDuyet: 'Đã duyệt' },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Yêu cầu không tồn tại!" });
    }

    const sach = await Sach.findOne({ MaSach: updatedOrder.MaSach });
    if (sach) {
      sach.SoQuyen -= updatedOrder.SoLuong;
      await sach.save();
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};