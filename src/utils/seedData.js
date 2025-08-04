const { User, Account, TodoList, TodoItem } = require("../models");
const { connectDB, disconnectDB } = require("../config/database");

const seedData = async () => {
  try {
    console.log("🌱 Bắt đầu seed dữ liệu...");

    // Kết nối database
    await connectDB();

    // Xóa dữ liệu cũ (optional)
    await User.deleteMany({});
    await Account.deleteMany({});
    await TodoList.deleteMany({});
    await TodoItem.deleteMany({});

    console.log("✅ Đã xóa dữ liệu cũ");

    // Tạo users
    const user1 = await User.create({
      name: "Nguyễn Văn A",
      gender: "M",
      dob: new Date("1990-01-15"),
    });

    const user2 = await User.create({
      name: "Trần Thị B",
      gender: "F",
      dob: new Date("1995-05-20"),
    });

    console.log("✅ Đã tạo users");

    // Tạo accounts
    await Account.create({
      user_id: user1._id,
      username: "nguyenvana",
      hashedPassword: "$2b$10$example.hash.password",
      status: "active",
    });

    await Account.create({
      user_id: user2._id,
      username: "tranthib",
      hashedPassword: "$2b$10$example.hash.password",
      status: "active",
    });

    console.log("✅ Đã tạo accounts");

    // Tạo todo lists
    const todoList1 = await TodoList.create({
      name: "Công việc hàng ngày",
      user_id: user1._id,
      status: "unfinished",
    });

    const todoList2 = await TodoList.create({
      name: "Dự án web",
      user_id: user1._id,
      status: "unfinished",
    });

    const todoList3 = await TodoList.create({
      name: "Học tập",
      user_id: user2._id,
      status: "unfinished",
    });

    console.log("✅ Đã tạo todo lists");

    // Tạo todo items
    await TodoItem.create({
      todo_group_id: todoList1._id,
      name: "Đọc email",
      des: "Kiểm tra và trả lời email quan trọng",
      due_at: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 giờ nữa
      status: "todo",
    });

    await TodoItem.create({
      todo_group_id: todoList1._id,
      name: "Họp team",
      des: "Họp định kỳ với team về tiến độ dự án",
      due_at: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 giờ nữa
      status: "in-progress",
    });

    await TodoItem.create({
      todo_group_id: todoList1._id,
      name: "Làm báo cáo",
      des: "Hoàn thành báo cáo tuần",
      due_at: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 ngày trước
      status: "finish",
    });

    await TodoItem.create({
      todo_group_id: todoList2._id,
      name: "Thiết kế UI",
      des: "Thiết kế giao diện người dùng cho ứng dụng",
      due_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 ngày nữa
      status: "todo",
    });

    await TodoItem.create({
      todo_group_id: todoList2._id,
      name: "Code backend API",
      des: "Viết API cho ứng dụng web",
      due_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 ngày nữa
      status: "in-progress",
    });

    await TodoItem.create({
      todo_group_id: todoList3._id,
      name: "Học React",
      des: "Tìm hiểu về React hooks và context",
      due_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày nữa
      status: "todo",
    });

    await TodoItem.create({
      todo_group_id: todoList3._id,
      name: "Làm bài tập Node.js",
      des: "Hoàn thành bài tập về Express.js và MongoDB",
      due_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 ngày nữa
      status: "todo",
    });

    console.log("✅ Đã tạo todo items");

    // Hiển thị thống kê
    const userCount = await User.countDocuments();
    const accountCount = await Account.countDocuments();
    const todoListCount = await TodoList.countDocuments();
    const todoItemCount = await TodoItem.countDocuments();

    console.log("\n📊 Thống kê dữ liệu đã seed:");
    console.log(`👥 Users: ${userCount}`);
    console.log(`🔐 Accounts: ${accountCount}`);
    console.log(`📋 Todo Lists: ${todoListCount}`);
    console.log(`✅ Todo Items: ${todoItemCount}`);

    console.log("\n🎉 Seed dữ liệu thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi seed dữ liệu:", error.message);
  } finally {
    await disconnectDB();
  }
};

// Chạy seed nếu được gọi trực tiếp
if (require.main === module) {
  seedData();
}

module.exports = seedData;
