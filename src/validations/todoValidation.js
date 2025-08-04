const appConfig = require("../config/app");
const { createErrorResponse } = require("../utils/response");

// Validation cho tạo todo mới
const validateCreateTodo = (req, res, next) => {
  const { name, des, todo_group_id, due_at, status } = req.body;

  // Kiểm tra name
  if (!name || name.trim() === "") {
    return res
      .status(400)
      .json(createErrorResponse("Tên todo là bắt buộc", 400));
  }

  if (name.length > 200) {
    return res
      .status(400)
      .json(createErrorResponse("Tên todo không được vượt quá 200 ký tự", 400));
  }

  // Kiểm tra todo_group_id
  if (!todo_group_id) {
    return res
      .status(400)
      .json(createErrorResponse("Todo group ID là bắt buộc", 400));
  }

  // Kiểm tra due_at
  if (!due_at) {
    return res
      .status(400)
      .json(createErrorResponse("Hạn chót là bắt buộc", 400));
  }

  // Kiểm tra due_at có phải là date hợp lệ
  const dueDate = new Date(due_at);
  if (isNaN(dueDate.getTime())) {
    return res
      .status(400)
      .json(createErrorResponse("Hạn chót không hợp lệ", 400));
  }

  // Kiểm tra des nếu có
  if (des && des.length > 1000) {
    return res
      .status(400)
      .json(createErrorResponse("Mô tả không được vượt quá 1000 ký tự", 400));
  }

  // Kiểm tra status nếu có
  if (status && !["todo", "in-progress", "finish"].includes(status)) {
    return res
      .status(400)
      .json(
        createErrorResponse(
          "Trạng thái phải là todo, in-progress hoặc finish",
          400
        )
      );
  }

  next();
};

// Validation cho cập nhật todo
const validateUpdateTodo = (req, res, next) => {
  const { name, des, due_at, status } = req.body;

  // Kiểm tra name nếu có
  if (name !== undefined) {
    if (name.trim() === "") {
      return res
        .status(400)
        .json(createErrorResponse("Tên todo không được để trống", 400));
    }

    if (name.length > 200) {
      return res
        .status(400)
        .json(
          createErrorResponse("Tên todo không được vượt quá 200 ký tự", 400)
        );
    }
  }

  // Kiểm tra des nếu có
  if (des !== undefined && des.length > 1000) {
    return res
      .status(400)
      .json(createErrorResponse("Mô tả không được vượt quá 1000 ký tự", 400));
  }

  // Kiểm tra due_at nếu có
  if (due_at !== undefined) {
    const dueDate = new Date(due_at);
    if (isNaN(dueDate.getTime())) {
      return res
        .status(400)
        .json(createErrorResponse("Hạn chót không hợp lệ", 400));
    }
  }

  // Kiểm tra status nếu có
  if (
    status !== undefined &&
    !["todo", "in-progress", "finish"].includes(status)
  ) {
    return res
      .status(400)
      .json(
        createErrorResponse(
          "Trạng thái phải là todo, in-progress hoặc finish",
          400
        )
      );
  }

  next();
};

// Validation cho ID
const validateId = (req, res, next) => {
  const { id } = req.params;

  // Kiểm tra ID có phải là MongoDB ObjectId hợp lệ
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  if (!objectIdPattern.test(id)) {
    return res.status(400).json(createErrorResponse("ID không hợp lệ", 400));
  }

  next();
};

// Validation cho query parameters
const validateQueryParams = (req, res, next) => {
  const { status, todo_group_id, search } = req.query;

  // Kiểm tra status parameter
  if (status && !["todo", "in-progress", "finish"].includes(status)) {
    return res
      .status(400)
      .json(
        createErrorResponse(
          "Status parameter phải là todo, in-progress hoặc finish",
          400
        )
      );
  }

  // Kiểm tra todo_group_id parameter
  if (todo_group_id) {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    if (!objectIdPattern.test(todo_group_id)) {
      return res
        .status(400)
        .json(createErrorResponse("Todo group ID không hợp lệ", 400));
    }
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
