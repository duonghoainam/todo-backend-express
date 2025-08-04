// Cấu hình ứng dụng
const config = {
  // Cấu hình server
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
    env: process.env.NODE_ENV || "development",
  },

  // Cấu hình API
  api: {
    version: "1.0.0",
    prefix: "/api",
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 phút
      max: 100, // giới hạn 100 requests per windowMs
    },
  },

  // Cấu hình CORS
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  },

  // Cấu hình logging
  logging: {
    level: process.env.LOG_LEVEL || "info",
    format: "combined",
  },

  // Cấu hình validation
  validation: {
    title: {
      minLength: 1,
      maxLength: 200,
    },
    description: {
      maxLength: 1000,
    },
  },
};

module.exports = config;
