const mongoose = require("mongoose");

const todoListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên danh sách là bắt buộc"],
      trim: true,
      maxlength: [200, "Tên danh sách không được vượt quá 200 ký tự"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID là bắt buộc"],
    },
    status: {
      type: String,
      required: [true, "Trạng thái là bắt buộc"],
      enum: {
        values: ["unfinished", "finish"],
        message: "Trạng thái phải là unfinished hoặc finish",
      },
      default: "unfinished",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual để đếm số todo items trong list
todoListSchema.virtual("todoCount").get(async function () {
  const TodoItem = mongoose.model("TodoItem");
  return await TodoItem.countDocuments({ todo_group_id: this._id });
});

// Virtual để đếm số todo items đã hoàn thành
todoListSchema.virtual("completedCount").get(async function () {
  const TodoItem = mongoose.model("TodoItem");
  return await TodoItem.countDocuments({
    todo_group_id: this._id,
    status: "finish",
  });
});

// Virtual để tính tỷ lệ hoàn thành
todoListSchema.virtual("completionRate").get(async function () {
  const TodoItem = mongoose.model("TodoItem");
  const total = await TodoItem.countDocuments({ todo_group_id: this._id });
  const completed = await TodoItem.countDocuments({
    todo_group_id: this._id,
    status: "finish",
  });

  return total > 0 ? Math.round((completed / total) * 100) : 0;
});

// Index để tối ưu query
todoListSchema.index({ user_id: 1 });
todoListSchema.index({ status: 1 });
todoListSchema.index({ name: 1 });

// Compound index
todoListSchema.index({ user_id: 1, status: 1 });

module.exports = mongoose.model("TodoList", todoListSchema);
