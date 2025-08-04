const appConfig = require("../config/app");
const { createErrorResponse } = require("../utils/response");

// Validation cho tạo todo mới
const validateCreateTodo = (req, res, next) => {
  const { title, description } = req.body;

  // Kiểm tra title
  if (!title || title.trim() === "") {
    return res.status(400).json(createErrorResponse("Title là bắt buộc", 400));
  }

  if (title.length > appConfig.validation.title.maxLength) {
    return res
      .status(400)
      .json(
        createErrorResponse(
          `Title không được vượt quá ${appConfig.validation.title.maxLength} ký tự`,
          400
        )
      );
  }

  // Kiểm tra description (optional)
  if (
    description &&
    description.length > appConfig.validation.description.maxLength
  ) {
    return res
      .status(400)
      .json(
        createErrorResponse(
          `Description không được vượt quá ${appConfig.validation.description.maxLength} ký tự`,
          400
        )
      );
  }

  next();
};

// Validation cho cập nhật todo
const validateUpdateTodo = (req, res, next) => {
  const { title, description, completed } = req.body;

  // Kiểm tra title nếu có
  if (title !== undefined) {
    if (title.trim() === "") {
      return res
        .status(400)
        .json(createErrorResponse("Title không được để trống", 400));
    }

    if (title.length > appConfig.validation.title.maxLength) {
      return res
        .status(400)
        .json(
          createErrorResponse(
            `Title không được vượt quá ${appConfig.validation.title.maxLength} ký tự`,
            400
          )
        );
    }
  }

  // Kiểm tra description nếu có
  if (
    description !== undefined &&
    description.length > appConfig.validation.description.maxLength
  ) {
    return res
      .status(400)
      .json(
        createErrorResponse(
          `Description không được vượt quá ${appConfig.validation.description.maxLength} ký tự`,
          400
        )
      );
  }

  // Kiểm tra completed nếu có
  if (completed !== undefined && typeof completed !== "boolean") {
    return res
      .status(400)
      .json(createErrorResponse("Completed phải là boolean", 400));
  }

  next();
};

// Validation cho ID
const validateId = (req, res, next) => {
  const { id } = req.params;
  const numId = parseInt(id);

  if (isNaN(numId) || numId <= 0) {
    return res.status(400).json(createErrorResponse("ID không hợp lệ", 400));
  }

  next();
};

// Validation cho query parameters
const validateQueryParams = (req, res, next) => {
  const { completed, search } = req.query;

  // Kiểm tra completed parameter
  if (
    completed !== undefined &&
    completed !== "true" &&
    completed !== "false"
  ) {
    return res
      .status(400)
      .json(
        createErrorResponse(
          "Completed parameter phải là 'true' hoặc 'false'",
          400
        )
      );
  }

  // Kiểm tra search parameter
  if (search && typeof search !== "string") {
    return res
      .status(400)
      .json(createErrorResponse("Search parameter phải là string", 400));
  }

  next();
};

module.exports = {
  validateCreateTodo,
  validateUpdateTodo,
  validateId,
  validateQueryParams,
};
