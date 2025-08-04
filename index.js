const express = require("express");
const app = express();
const port = 3000;

// Middleware để xử lý dữ liệu JSON
app.use(express.json());

// In-memory storage cho todos (trong thực tế sẽ dùng database)
let todos = [
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
];

let nextId = 3;

// Helper function để tìm todo theo ID
const findTodoById = (id) => {
  return todos.find((todo) => todo.id === parseInt(id));
};

// Helper function để tạo response chuẩn
const createResponse = (success, data, message = "") => {
  return {
    success,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
};

// 1. GET /api/todos - Lấy tất cả todos
app.get("/api/todos", (req, res) => {
  try {
    const { completed, search } = req.query;
    let filteredTodos = [...todos];

    // Filter theo trạng thái completed
    if (completed !== undefined) {
      const isCompleted = completed === "true";
      filteredTodos = filteredTodos.filter(
        (todo) => todo.completed === isCompleted
      );
    }

    // Filter theo từ khóa tìm kiếm
    if (search) {
      const searchLower = search.toLowerCase();
      filteredTodos = filteredTodos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchLower) ||
          todo.description.toLowerCase().includes(searchLower)
      );
    }

    res.json(
      createResponse(true, filteredTodos, "Lấy danh sách todos thành công")
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, "Lỗi server: " + error.message));
  }
});

// 2. GET /api/todos/stats - Thống kê todos
app.get("/api/todos/stats", (req, res) => {
  try {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const pending = total - completed;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    const stats = {
      total,
      completed,
      pending,
      completionRate: `${completionRate}%`,
    };

    res.json(createResponse(true, stats, "Thống kê todos"));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, "Lỗi server: " + error.message));
  }
});

// 3. GET /api/todos/:id - Lấy todo theo ID
app.get("/api/todos/:id", (req, res) => {
  try {
    const todo = findTodoById(req.params.id);

    if (!todo) {
      return res
        .status(404)
        .json(createResponse(false, null, "Không tìm thấy todo"));
    }

    res.json(createResponse(true, todo, "Lấy todo thành công"));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, "Lỗi server: " + error.message));
  }
});

// 4. POST /api/todos - Tạo todo mới
app.post("/api/todos", (req, res) => {
  try {
    const { title, description } = req.body;

    // Validation
    if (!title || title.trim() === "") {
      return res
        .status(400)
        .json(createResponse(false, null, "Title là bắt buộc"));
    }

    const newTodo = {
      id: nextId++,
      title: title.trim(),
      description: description ? description.trim() : "",
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    todos.push(newTodo);

    res.status(201).json(createResponse(true, newTodo, "Tạo todo thành công"));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, "Lỗi server: " + error.message));
  }
});

// 5. PUT /api/todos/:id - Cập nhật todo
app.put("/api/todos/:id", (req, res) => {
  try {
    const todo = findTodoById(req.params.id);

    if (!todo) {
      return res
        .status(404)
        .json(createResponse(false, null, "Không tìm thấy todo"));
    }

    const { title, description, completed } = req.body;

    // Validation
    if (title !== undefined && title.trim() === "") {
      return res
        .status(400)
        .json(createResponse(false, null, "Title không được để trống"));
    }

    // Cập nhật các trường
    if (title !== undefined) todo.title = title.trim();
    if (description !== undefined) todo.description = description.trim();
    if (completed !== undefined) todo.completed = Boolean(completed);

    todo.updatedAt = new Date().toISOString();

    res.json(createResponse(true, todo, "Cập nhật todo thành công"));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, "Lỗi server: " + error.message));
  }
});

// 6. PATCH /api/todos/:id/toggle - Toggle trạng thái completed
app.patch("/api/todos/:id/toggle", (req, res) => {
  try {
    const todo = findTodoById(req.params.id);

    if (!todo) {
      return res
        .status(404)
        .json(createResponse(false, null, "Không tìm thấy todo"));
    }

    todo.completed = !todo.completed;
    todo.updatedAt = new Date().toISOString();

    res.json(createResponse(true, todo, "Toggle trạng thái thành công"));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, "Lỗi server: " + error.message));
  }
});

// 7. DELETE /api/todos/:id - Xóa todo
app.delete("/api/todos/:id", (req, res) => {
  try {
    const todoIndex = todos.findIndex(
      (todo) => todo.id === parseInt(req.params.id)
    );

    if (todoIndex === -1) {
      return res
        .status(404)
        .json(createResponse(false, null, "Không tìm thấy todo"));
    }

    const deletedTodo = todos.splice(todoIndex, 1)[0];

    res.json(createResponse(true, deletedTodo, "Xóa todo thành công"));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, "Lỗi server: " + error.message));
  }
});

// 8. DELETE /api/todos - Xóa tất cả todos
app.delete("/api/todos", (req, res) => {
  try {
    const deletedCount = todos.length;
    todos = [];

    res.json(
      createResponse(true, { deletedCount }, `Đã xóa ${deletedCount} todos`)
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, "Lỗi server: " + error.message));
  }
});

// Route mặc định
app.get("/", (req, res) => {
  res.json({
    message: "Todo API Server",
    version: "1.0.0",
    endpoints: {
      "GET /api/todos": "Lấy tất cả todos",
      "GET /api/todos/:id": "Lấy todo theo ID",
      "POST /api/todos": "Tạo todo mới",
      "PUT /api/todos/:id": "Cập nhật todo",
      "PATCH /api/todos/:id/toggle": "Toggle trạng thái completed",
      "DELETE /api/todos/:id": "Xóa todo",
      "DELETE /api/todos": "Xóa tất cả todos",
      "GET /api/todos/stats": "Thống kê todos",
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(createResponse(false, null, "Có lỗi xảy ra"));
});

// 404 handler
app.use((req, res) => {
  res
    .status(404)
    .json(createResponse(false, null, "API endpoint không tồn tại"));
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Todo API Server đang chạy tại http://localhost:${port}`);
  console.log(`📖 Xem tài liệu API tại http://localhost:${port}`);
});
