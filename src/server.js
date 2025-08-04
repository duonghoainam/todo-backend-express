const app = require("./app");
const appConfig = require("./config/app");
const { connectDB, disconnectDB } = require("./config/database");

const port = appConfig.server.port;
const host = appConfig.server.host;

// Khởi động server với MongoDB
const startServer = async () => {
  try {
    // Kết nối MongoDB trước
    await connectDB();

    // Khởi động server
    const server = app.listen(port, host, () => {
      console.log(`🚀 Todo API Server đang chạy tại http://${host}:${port}`);
      console.log(`📖 Xem tài liệu API tại http://${host}:${port}`);
      console.log(`🌍 Environment: ${appConfig.server.env}`);
      console.log(`📅 Started at: ${new Date().toISOString()}`);
    });

    // Xử lý graceful shutdown
    process.on("SIGTERM", async () => {
      console.log("SIGTERM received, shutting down gracefully");
      server.close(async () => {
        await disconnectDB();
        console.log("Process terminated");
      });
    });

    process.on("SIGINT", async () => {
      console.log("SIGINT received, shutting down gracefully");
      server.close(async () => {
        await disconnectDB();
        console.log("Process terminated");
      });
    });

    // Xử lý unhandled errors
    process.on("uncaughtException", async (err) => {
      console.error("Uncaught Exception:", err);
      await disconnectDB();
      process.exit(1);
    });

    process.on("unhandledRejection", async (reason, promise) => {
      console.error("Unhandled Rejection at:", promise, "reason:", reason);
      await disconnectDB();
      process.exit(1);
    });

    return server;
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

// Khởi động server
startServer();
