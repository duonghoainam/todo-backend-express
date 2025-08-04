const express = require("express");
const appConfig = require("./config/app");
const todoRoutes = require("./routes/todoRoutes");
const {
  errorHandler,
  notFoundHandler,
  requestLogger,
  corsHandler,
} = require("./middlewares/errorHandler");

const app = express();

// Middleware cơ bản
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsHandler);
app.use(requestLogger);

// Routes
app.use(`${appConfig.api.prefix}/todos`, todoRoutes);

// Route mặc định
app.get("/", (req, res) => {
  res.json({
    message: "Todo API Server",
    version: appConfig.api.version,
    endpoints: {
      "GET /api/todos": "Lấy tất cả todos",
      "GET /api/todos/stats": "Thống kê todos",
      "GET /api/todos/:id": "Lấy todo theo ID",
      "POST /api/todos": "Tạo todo mới",
      "PUT /api/todos/:id": "Cập nhật todo",
      "PATCH /api/todos/:id/toggle": "Toggle trạng thái completed",
      "DELETE /api/todos/:id": "Xóa todo",
      "DELETE /api/todos": "Xóa tất cả todos",
    },
  });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
