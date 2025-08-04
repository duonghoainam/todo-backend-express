// Cấu hình database
// Hiện tại sử dụng in-memory storage
// Có thể mở rộng để kết nối MongoDB, PostgreSQL, etc.

const config = {
  // In-memory storage cho development
  storage: {
    type: "memory",
    todos: [
      {
        id: 1,
        title: "Học Express.js",
        description: "Tìm hiểu về Express.js framework",
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Tạo API Todo",
        description: "Xây dựng RESTful API cho todo app",
        completed: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    nextId: 3,
  },

  // Cấu hình cho database thực (có thể sử dụng sau)
  database: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || "todo_app",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
  },
};

module.exports = config;
