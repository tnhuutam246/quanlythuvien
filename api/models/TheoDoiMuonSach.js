const mongoose = require("mongoose");

const TheoDoiMuonSachSchema = new mongoose.Schema(
    {
      maDocGia: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      maSach: { type: mongoose.Schema.Types.ObjectId, ref: 'Sach' },
      ngayMuon: { type: Date, default: Date.now }, // Mặc định là ngày hiện tại
      ngayTra: { type: Date },
      tinhTrang: {
        type: Boolean,
        default: false,
      },
      trangThaiMuon:{
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

// Thiết lập pre-hook để tính ngày trả sau 2 tuần từ ngày mượn
TheoDoiMuonSachSchema.pre('save', function(next) {
  if (this.ngayMuon && !this.ngayTra) {
    const ngayTra = new Date(this.ngayMuon);
    ngayTra.setDate(ngayTra.getDate() + 14); // Tính ngày trả sau 2 tuần (14 ngày)
    this.ngayTra = ngayTra;
  }
  next();
});

module.exports = mongoose.model("TheoDoiMuonSach", TheoDoiMuonSachSchema);
