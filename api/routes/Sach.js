const router = require("express").Router();
const Sach = require("../models/Sach");
const CryptoJS = require("crypto-js");

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");

//CREATE
router.post("/",verifyTokenAndAdmin, async (req, res) => {
    const newSach = new Sach(req.body);
    try {
      const savedSach = await newSach.save();
      res.status(200).json(savedSach);
    } catch (err) {
      res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id",verifyTokenAndAdmin, async (req, res) => { //verifyTokenAndAdmin
  try {
    const updateSach = await Sach.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateSach);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id",verifyTokenAndAdmin, async (req, res) => { //verifyTokenAndAdmin
  try {
    await Sach.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SACH
router.get("/find/:id", async (req, res) => {
  try {
    const sach = await Sach.findById(req.params.id);
    res.status(200).json(sach);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL SACH
router.get("/", async (req, res) => {
  try { 
    const allSach = await Sach.find();
    res.status(200).json(allSach);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;