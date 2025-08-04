const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên người dùng là bắt buộc"],
      trim: true,
      maxlength: [100, "Tên không được vượt quá 100 ký tự"],
    },
    gender: {
      type: String,
      required: [true, "Giới tính là bắt buộc"],
      enum: {
        values: ["F", "M"],
        message: "Giới tính phải là F hoặc M",
      },
    },
    dob: {
      type: Date,
      required: [true, "Ngày sinh là bắt buộc"],
    },
  },
  {
    timestamps: true, // Tự động tạo createdAt và updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual để tính tuổi
userSchema.virtual("age").get(function () {
  if (!this.dob) return null;
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
});

// Index để tối ưu query
userSchema.index({ name: 1 });
userSchema.index({ gender: 1 });
userSchema.index({ dob: 1 });

module.exports = mongoose.model("User", userSchema);
