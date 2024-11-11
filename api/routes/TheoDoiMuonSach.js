const router = require("express").Router();
const TheoDoiMuonSach = require("../models/TheoDoiMuonSach");
const Sach = require("../models/Sach");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const mongoose = require("mongoose");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const { maDocGia, maSach } = req.body;

  try {
    // Tìm tất cả các bản ghi trùng với maDocGia và maSach
    const existingRecords = await TheoDoiMuonSach.find({ maDocGia, maSach });

    // Kiểm tra nếu có bất kỳ bản ghi nào trùng và tinhTrang là false
    if (existingRecords.some((record) => !record.tinhTrang)) {
      return res
        .status(400)
        .json({ message: "Một hoặc nhiều dữ liệu đã tồn tại và đã được trả." });
    }

    // Nếu không có bản ghi trùng hoặc tất cả các bản ghi đều đã trả, tiếp tục thêm mới
    const newTGMS = new TheoDoiMuonSach(req.body);
    const savedTGMS = await newTGMS.save();
    res.status(200).json(savedTGMS);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id",verifyTokenAndAdmin, async (req, res) => {
  //verifyTokenAndAdmin
  try {
    const updateTGMS = await TheoDoiMuonSach.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateTGMS);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  //verifyTokenAndAdmin
  try {
    await TheoDoiMuonSach.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET TGMS
router.get("/find/:id", async (req, res) => {
  try {
    const TGMS = await TheoDoiMuonSach.findById(req.params.id)
      .populate({ path: "maSach", select: "tenSach" })
      .populate({ path: "maDocGia", select: "username" });
    res.status(200).json(TGMS);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL TGMS
router.get("/", async (req, res) => {
  try {
    const unreturnedRecords = await TheoDoiMuonSach.find()
      .populate({ path: "maSach", select: "tenSach" })
      .populate({ path: "maDocGia", select: "username" });
    // Tạo một mảng mới chứa thông tin được mở rộng
    const extendedRecords = unreturnedRecords.map((record) => ({
      _id: record._id,
      maDocGia: record.maDocGia,
      maSach: record.maSach,
      tinhTrang: record.tinhTrang,
      trangThaiMuon: record.trangThaiMuon,
      ngayMuon: record.ngayMuon,
      ngayTra: record.ngayTra,
    }));

    res.status(200).json(extendedRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route để lấy TheoDoiMuonSach dựa trên id của Sach và tính số lượng
router.get("/count/:SachId/", async (req, res) => {
  try {
    const sachId = new mongoose.Types.ObjectId(req.params.SachId);

    // Lấy ra số quyển sách cụ thể
    const sach = await Sach.findById(sachId);
    const soQuyen = sach.soQuyen;

    // Lấy ra số lượng sách đã được mượn
    const countMuon = await TheoDoiMuonSach.countDocuments({ maSach: sachId, tinhTrang: false});

    // Tính toán số lượng sách còn lại
    const count = soQuyen - countMuon;

    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route để lấy TheoDoiMuonSach dựa trên id của User
router.get("/user/:userId", async (req, res) => {
  try {
    const theoDoiMuonSach = await TheoDoiMuonSach.find({
      maDocGia: req.params.userId,
    }).populate("maSach", "tenSach");
    if (theoDoiMuonSach.length === 0) {
      // Kiểm tra chiều dài của mảng
      return res
        .status(404)
        .json({ message: "Không tìm thấy TheoDoiMuonSach cho User này." });
    }
    res.status(200).json(theoDoiMuonSach);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route để lấy thông tin các TheoDoiMuonSach với tinhTrang = false
router.get("/unreturned", async (req, res) => {
  try {
    const unreturnedRecords = await TheoDoiMuonSach.find({ tinhTrang: false })
      .populate({ path: "maSach", select: "tenSach" })
      .populate({ path: "maDocGia", select: "username" });
    // Tạo một mảng mới chứa thông tin được mở rộng
    const extendedRecords = unreturnedRecords.map((record) => ({
      _id: record._id,
      maDocGia: record.maDocGia,
      maSach: record.maSach,
      tinhTrang: record.tinhTrang,
      trangThaiMuon: record.trangThaiMuon,
      ngayMuon: record.ngayMuon,
      ngayTra: record.ngayTra,
    }));

    res.status(200).json(extendedRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
