const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/todoController");
const {
  validateCreateTodo,
  validateUpdateTodo,
  validateId,
  validateQueryParams,
} = require("../validations/todoValidation");

const todoController = new TodoController();

// GET /api/todos - Lấy tất cả todos
router.get(
  "/",
  validateQueryParams,
  todoController.getAllTodos.bind(todoController)
);

// GET /api/todos/stats - Thống kê todos
router.get("/stats", todoController.getTodoStats.bind(todoController));

// GET /api/todos/:id - Lấy todo theo ID
router.get("/:id", validateId, todoController.getTodoById.bind(todoController));

// POST /api/todos - Tạo todo mới
router.post(
  "/",
  validateCreateTodo,
  todoController.createTodo.bind(todoController)
);

// PUT /api/todos/:id - Cập nhật todo
router.put(
  "/:id",
  validateId,
  validateUpdateTodo,
  todoController.updateTodo.bind(todoController)
);

// PATCH /api/todos/:id/toggle - Toggle trạng thái completed
router.patch(
  "/:id/toggle",
  validateId,
  todoController.toggleTodo.bind(todoController)
);

// DELETE /api/todos/:id - Xóa todo
router.delete(
  "/:id",
  validateId,
  todoController.deleteTodo.bind(todoController)
);

// DELETE /api/todos - Xóa tất cả todos
router.delete("/", todoController.deleteAllTodos.bind(todoController));

module.exports = router;
