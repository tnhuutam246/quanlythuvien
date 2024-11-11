const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SC
    ).toString(),
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address
  });
  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADDMIN ADD USER
router.post("/adduser",verifyTokenAndAdmin, async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SC
    ).toString(),
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    isAdmin: req.body.isAdmin || false // Nếu không có giá trị isAdmin trong req.body thì mặc định là false
  });
  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "Tên người dùng không tồn tại." });
    }
    const bytes  = CryptoJS.AES.decrypt(user.password, process.env.PASS_SC);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      return res.status(401).json({ message: "Mật khẩu không chính xác." });
    }
    const token = jwt.sign(
      { userId: user._id,
        isAdmin: user.isAdmin},
      process.env.JWT_SEC,
      { expiresIn: "1h" }
    );  
    
    // Thêm thông tin người dùng và token vào kết quả trả về
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Đăng nhập thất bại:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình đăng nhập." });
  }
});



module.exports = router;
