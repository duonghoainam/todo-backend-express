const TodoService = require("../services/todoService");
const { createErrorResponse } = require("../utils/response");

class TodoController {
  constructor() {
    this.todoService = new TodoService();
  }

  // Lấy tất cả todos
  async getAllTodos(req, res) {
    try {
      const { status, todo_group_id, search } = req.query;
      const filters = {};

      if (status) {
        filters.status = status;
      }

      if (todo_group_id) {
        filters.todo_group_id = todo_group_id;
      }

      if (search) {
        filters.search = search;
      }

      const result = await this.todoService.getAllTodos(filters);
      res.json(result);
    } catch (error) {
      res.status(500).json(createErrorResponse("Lỗi server: " + error.message));
    }
  }

  // Lấy todo theo ID
  async getTodoById(req, res) {
    try {
      const { id } = req.params;
      const result = await this.todoService.getTodoById(id);

      if (!result.success) {
        return res.status(404).json(result);
      }

      res.json(result);
    } catch (error) {
      res.status(500).json(createErrorResponse("Lỗi server: " + error.message));
    }
  }

  // Tạo todo mới
  async createTodo(req, res) {
    try {
      const result = await this.todoService.createTodo(req.body);

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json(createErrorResponse("Lỗi server: " + error.message));
    }
  }

  // Cập nhật todo
  async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const result = await this.todoService.updateTodo(id, req.body);

      if (!result.success) {
        return res.status(404).json(result);
      }

      res.json(result);
    } catch (error) {
      res.status(500).json(createErrorResponse("Lỗi server: " + error.message));
    }
  }

  // Toggle trạng thái todo
  async toggleTodo(req, res) {
    try {
      const { id } = req.params;
      const result = await this.todoService.toggleTodo(id);

      if (!result.success) {
        return res.status(404).json(result);
      }

      res.json(result);
    } catch (error) {
      res.status(500).json(createErrorResponse("Lỗi server: " + error.message));
    }
  }

  // Xóa todo
  async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      const result = await this.todoService.deleteTodo(id);

      if (!result.success) {
        return res.status(404).json(result);
      }

      res.json(result);
    } catch (error) {
      res.status(500).json(createErrorResponse("Lỗi server: " + error.message));
    }
  }

  // Xóa tất cả todos
  async deleteAllTodos(req, res) {
    try {
      const result = await this.todoService.deleteAllTodos();
      res.json(result);
    } catch (error) {
      res.status(500).json(createErrorResponse("Lỗi server: " + error.message));
    }
  }

  // Lấy thống kê todos
  async getTodoStats(req, res) {
    try {
      const result = await this.todoService.getTodoStats();
      res.json(result);
    } catch (error) {
      res.status(500).json(createErrorResponse("Lỗi server: " + error.message));
    }
  }

  // Lấy tất cả todo lists
  async getAllTodoLists(req, res) {
    try {
      const { user_id } = req.query;
      const result = await this.todoService.getAllTodoLists(user_id);
      res.json(result);
    } catch (error) {
      res.status(500).json(createErrorResponse("Lỗi server: " + error.message));
    }
  }

  // Tạo todo list mới
  async createTodoList(req, res) {
    try {
      const result = await this.todoService.createTodoList(req.body);

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json(createErrorResponse("Lỗi server: " + error.message));
    }
  }
}

module.exports = TodoController;
