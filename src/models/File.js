const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: [true, "Đường dẫn file là bắt buộc"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Loại file là bắt buộc"],
      trim: true,
    },
    originalName: {
      type: String,
      required: [true, "Tên file gốc là bắt buộc"],
      trim: true,
    },
    size: {
      type: Number,
      required: [true, "Kích thước file là bắt buộc"],
      min: [0, "Kích thước file không được âm"],
    },
    mimeType: {
      type: String,
      required: [true, "MIME type là bắt buộc"],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User upload là bắt buộc"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual để lấy URL file
fileSchema.virtual("url").get(function () {
  return `/uploads/${this.path}`;
});

// Virtual để format kích thước file
fileSchema.virtual("formattedSize").get(function () {
  const bytes = this.size;
  const sizes = ["Bytes", "KB", "MB", "GB"];

  if (bytes === 0) return "0 Bytes";

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
});

// Virtual để kiểm tra file có phải là image không
fileSchema.virtual("isImage").get(function () {
  return this.mimeType.startsWith("image/");
});

// Virtual để kiểm tra file có phải là document không
fileSchema.virtual("isDocument").get(function () {
  const documentTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
  ];
  return documentTypes.includes(this.mimeType);
});

// Index để tối ưu query
fileSchema.index({ uploadedBy: 1 });
fileSchema.index({ type: 1 });
fileSchema.index({ mimeType: 1 });
fileSchema.index({ createdAt: -1 });

// Compound index
fileSchema.index({ uploadedBy: 1, type: 1 });

module.exports = mongoose.model("File", fileSchema);
