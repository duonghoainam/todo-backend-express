const app = require("./app");
const appConfig = require("./config/app");

const port = appConfig.server.port;
const host = appConfig.server.host;

// Khởi động server
const server = app.listen(port, host, () => {
  console.log(`🚀 Todo API Server đang chạy tại http://${host}:${port}`);
  console.log(`📖 Xem tài liệu API tại http://${host}:${port}`);
  console.log(`🌍 Environment: ${appConfig.server.env}`);
  console.log(`📅 Started at: ${new Date().toISOString()}`);
});

// Xử lý graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});

// Xử lý unhandled errors
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

module.exports = server;
