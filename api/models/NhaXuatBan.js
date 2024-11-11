const mongoose = require("mongoose");

const NhaXuatBanSchema = new mongoose.Schema(
    {
      tenNXB: { type: String, required: true },
      diaChi: { type: String, required: true }
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("NhaXuatBan", NhaXuatBanSchema);