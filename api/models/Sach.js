const mongoose = require("mongoose");

const SachSchema = new mongoose.Schema(
    {
      tenSach: { type: String, required: true },
      donGia: { type: Number, required: true },
      soQuyen: { type: Number, required: true },
      namXuatBan: { type: Number, required: true },
      maNXB: { type: mongoose.Schema.Types.ObjectId, ref: 'NhaXuatBan' },
      nguonGoc: { type: String },
      tacGia: { type: String },
      img: { type: String }
    },
    { timestamps: true }
  );

module.exports = mongoose.model("Sach", SachSchema);
