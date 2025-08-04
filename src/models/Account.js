const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID là bắt buộc"],
    },
    username: {
      type: String,
      required: [true, "Username là bắt buộc"],
      unique: true,
      trim: true,
      minlength: [3, "Username phải có ít nhất 3 ký tự"],
      maxlength: [50, "Username không được vượt quá 50 ký tự"],
    },
    hashedPassword: {
      type: String,
      required: [true, "Mật khẩu là bắt buộc"],
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      required: [true, "Trạng thái là bắt buộc"],
      enum: {
        values: ["active", "deactive"],
        message: "Trạng thái phải là active hoặc deactive",
      },
      default: "active",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual để ẩn password khi trả về JSON
accountSchema.methods.toJSON = function () {
  const account = this.toObject();
  delete account.hashedPassword;
  delete account.accessToken;
  delete account.refreshToken;
  return account;
};

// Index để tối ưu query
accountSchema.index({ username: 1 });
accountSchema.index({ user_id: 1 });
accountSchema.index({ status: 1 });

// Compound index
accountSchema.index({ username: 1, status: 1 });

module.exports = mongoose.model("Account", accountSchema);
