const mongoose = require("mongoose");

const todoItemSchema = new mongoose.Schema(
  {
    todo_group_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TodoList",
      required: [true, "Todo group ID là bắt buộc"],
    },
    name: {
      type: String,
      required: [true, "Tên todo là bắt buộc"],
      trim: true,
      maxlength: [200, "Tên todo không được vượt quá 200 ký tự"],
    },
    des: {
      type: String,
      trim: true,
      maxlength: [1000, "Mô tả không được vượt quá 1000 ký tự"],
      default: "",
    },
    due_at: {
      type: Date,
      required: [true, "Hạn chót là bắt buộc"],
    },
    status: {
      type: String,
      required: [true, "Trạng thái là bắt buộc"],
      enum: {
        values: ["todo", "in-progress", "finish"],
        message: "Trạng thái phải là todo, in-progress hoặc finish",
      },
      default: "todo",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual để kiểm tra todo có quá hạn không
todoItemSchema.virtual("isOverdue").get(function () {
  if (this.status === "finish") return false;
  return new Date() > this.due_at;
});

// Virtual để tính thời gian còn lại
todoItemSchema.virtual("timeRemaining").get(function () {
  if (this.status === "finish") return null;

  const now = new Date();
  const dueDate = new Date(this.due_at);
  const diff = dueDate - now;

  if (diff <= 0) return "Quá hạn";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return `${days} ngày ${hours} giờ`;
  } else if (hours > 0) {
    return `${hours} giờ`;
  } else {
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${minutes} phút`;
  }
});

// Virtual để tính priority dựa trên due date
todoItemSchema.virtual("priority").get(function () {
  if (this.status === "finish") return "completed";

  const now = new Date();
  const dueDate = new Date(this.due_at);
  const diffHours = (dueDate - now) / (1000 * 60 * 60);

  if (diffHours < 0) return "overdue";
  if (diffHours < 24) return "high";
  if (diffHours < 72) return "medium";
  return "low";
});

// Index để tối ưu query
todoItemSchema.index({ todo_group_id: 1 });
todoItemSchema.index({ status: 1 });
todoItemSchema.index({ due_at: 1 });
todoItemSchema.index({ name: 1 });

// Compound indexes
todoItemSchema.index({ todo_group_id: 1, status: 1 });
todoItemSchema.index({ status: 1, due_at: 1 });

// Text index cho tìm kiếm
todoItemSchema.index({ name: "text", des: "text" });

module.exports = mongoose.model("TodoItem", todoItemSchema);
