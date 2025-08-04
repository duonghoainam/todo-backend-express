// Utility function để tạo response chuẩn
const createResponse = (success, data, message = "") => {
  return {
    success,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
};

// Utility function để tạo error response
const createErrorResponse = (message, statusCode = 500) => {
  return {
    success: false,
    data: null,
    message,
    timestamp: new Date().toISOString(),
    statusCode,
  };
};

// Utility function để validate ID
const isValidId = (id) => {
  const numId = parseInt(id);
  return !isNaN(numId) && numId > 0;
};

// Utility function để sanitize input
const sanitizeInput = (input) => {
  if (typeof input === "string") {
    return input.trim();
  }
  return input;
};

module.exports = {
  createResponse,
  createErrorResponse,
  isValidId,
  sanitizeInput,
};
