const express = require("express");
const appConfig = require("./config/app");
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");

const {
  errorHandler,
  notFoundHandler,
  requestLogger,
  // corsHandler,
} = require("./middlewares/errorHandler");

const app = express();

// Middleware cơ bản
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(corsHandler);
app.use(
  cors({
    origin: "*", // hoặc thay bằng domain frontend của bạn
    credentials: true,
  })
);
app.use(requestLogger);

// Routes
app.use(`${appConfig.api.prefix}/todos`, todoRoutes);

// Route mặc định
app.get("/", (req, res) => {
  res.json({
    message: "Todo API Server với MongoDB",
    version: appConfig.api.version,
    database: "MongoDB",
    endpoints: {
      "📋 Todo Items API": {
        "GET /api/todos": "Lấy tất cả todo items",
        "GET /api/todos/:id": "Lấy todo item theo ID",
        "POST /api/todos": "Tạo todo item mới",
        "PUT /api/todos/:id": "Cập nhật todo item",
        "PATCH /api/todos/:id/toggle": "Toggle trạng thái todo item",
        "DELETE /api/todos/:id": "Xóa todo item",
        "DELETE /api/todos": "Xóa tất cả todo items",
        "GET /api/todos/stats": "Thống kê todo items",
      },
      "📋 Todo Lists API": {
        "GET /api/todos/lists": "Lấy tất cả todo lists",
        "POST /api/todos/lists": "Tạo todo list mới",
      },
      "🔍 Query Parameters": {
        "?status=todo": "Filter theo trạng thái (todo/in-progress/finish)",
        "?todo_group_id=id": "Filter theo todo list",
        "?search=keyword": "Tìm kiếm theo name hoặc description",
        "?user_id=id": "Filter todo lists theo user",
      },
      "📊 Features": {
        "Virtual Fields": "isOverdue, timeRemaining, priority",
        "Populated References": "todo_group_id, user_id",
        "Text Search": "MongoDB text indexes",
        "Advanced Filtering": "Multiple conditions",
      },
    },
    examples: {
      "Create Todo": {
        method: "POST",
        url: "/api/todos",
        body: {
          name: "Học Node.js",
          des: "Tìm hiểu về Express.js và MongoDB",
          todo_group_id: "507f1f77bcf86cd799439012",
          due_at: "2024-01-20T18:00:00.000Z",
          status: "todo",
        },
      },
      "Create Todo List": {
        method: "POST",
        url: "/api/todos/lists",
        body: {
          name: "Dự án web",
          user_id: "507f1f77bcf86cd799439010",
          status: "unfinished",
        },
      },
    },
  });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
