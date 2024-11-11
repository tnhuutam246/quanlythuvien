const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const authRoute = require("./routes/auth");
const SachRoute = require("./routes/Sach");
const NXBRoute = require("./routes/NhaXuatBan");
const UserRoute = require("./routes/User");
const TGMSRoute = require("./routes/TheoDoiMuonSach");

dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/library")
  .then(() => console.log("DBConection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors())

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/sach", SachRoute);
app.use("/api/NXB", NXBRoute);
app.use("/api/user", UserRoute);
app.use("/api/TGMS", TGMSRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });