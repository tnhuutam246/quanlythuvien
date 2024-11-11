const router = require("express").Router();
const NhaXuatBan = require("../models/NhaXuatBan");
const CryptoJS = require("crypto-js");

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");

//CREATE
router.post("/",verifyTokenAndAdmin, async (req, res) => {
    const newNXB = new NhaXuatBan(req.body);
    try {
      const savedNXB = await newNXB.save();
      res.status(200).json(savedNXB);
    } catch (err) {
      res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id",verifyTokenAndAdmin, async (req, res) => { //verifyTokenAndAdmin
  try {
    const updateNXB = await NhaXuatBan.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateNXB);
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE
router.delete("/:id", async (req, res) => { //verifyTokenAndAdmin
  try {
    await NhaXuatBan.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SACH
router.get("/find/:id", async (req, res) => {
  try {
    const NXB = await NhaXuatBan.findById(req.params.id);
    res.status(200).json(NXB);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL SACH
router.get("/", async (req, res) => {
  try { 
    const allNXB = await NhaXuatBan.find();
    res.status(200).json(allNXB);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;