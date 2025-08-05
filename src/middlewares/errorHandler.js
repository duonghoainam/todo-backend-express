const { createErrorResponse } = require("../utils/response");

// Middleware xử lý lỗi
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack);

  // Lỗi validation
  if (err.name === "ValidationError") {
    return res.status(400).json(createErrorResponse(err.message, 400));
  }

  // Lỗi không tìm thấy
  if (err.name === "NotFoundError") {
    return res.status(404).json(createErrorResponse(err.message, 404));
  }

  // Lỗi server
  res.status(500).json(createErrorResponse("Có lỗi xảy ra", 500));
};

// Middleware xử lý 404
const notFoundHandler = (req, res) => {
  res.status(404).json(createErrorResponse("API endpoint không tồn tại", 404));
};

// Middleware logging
const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
    );
  });

  next();
};

// Middleware CORS
const corsHandler = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
};

module.exports = {
  errorHandler,
  notFoundHandler,
  requestLogger,
  // corsHandler,
};
