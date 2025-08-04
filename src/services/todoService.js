const Todo = require("../models/Todo");
const { createResponse } = require("../utils/response");

class TodoService {
  constructor() {
    this.todoModel = new Todo();
  }

  // Lấy tất cả todos
  async getAllTodos(filters = {}) {
    try {
      const todos = this.todoModel.findAll(filters);
      return createResponse(true, todos, "Lấy danh sách todos thành công");
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách todos: ${error.message}`);
    }
  }

  // Lấy todo theo ID
  async getTodoById(id) {
    try {
      const todo = this.todoModel.findById(id);
      if (!todo) {
        return createResponse(false, null, "Không tìm thấy todo");
      }
      return createResponse(true, todo, "Lấy todo thành công");
    } catch (error) {
      throw new Error(`Lỗi khi lấy todo: ${error.message}`);
    }
  }

  // Tạo todo mới
  async createTodo(todoData) {
    try {
      // Validation
      if (!todoData.title || todoData.title.trim() === "") {
        return createResponse(false, null, "Title là bắt buộc");
      }

      const newTodo = this.todoModel.create(todoData);
      return createResponse(true, newTodo, "Tạo todo thành công");
    } catch (error) {
      throw new Error(`Lỗi khi tạo todo: ${error.message}`);
    }
  }

  // Cập nhật todo
  async updateTodo(id, updateData) {
    try {
      // Validation
      if (updateData.title !== undefined && updateData.title.trim() === "") {
        return createResponse(false, null, "Title không được để trống");
      }

      const updatedTodo = this.todoModel.update(id, updateData);
      if (!updatedTodo) {
        return createResponse(false, null, "Không tìm thấy todo");
      }

      return createResponse(true, updatedTodo, "Cập nhật todo thành công");
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật todo: ${error.message}`);
    }
  }

  // Toggle trạng thái todo
  async toggleTodo(id) {
    try {
      const toggledTodo = this.todoModel.toggle(id);
      if (!toggledTodo) {
        return createResponse(false, null, "Không tìm thấy todo");
      }

      return createResponse(true, toggledTodo, "Toggle trạng thái thành công");
    } catch (error) {
      throw new Error(`Lỗi khi toggle todo: ${error.message}`);
    }
  }

  // Xóa todo
  async deleteTodo(id) {
    try {
      const deletedTodo = this.todoModel.delete(id);
      if (!deletedTodo) {
        return createResponse(false, null, "Không tìm thấy todo");
      }

      return createResponse(true, deletedTodo, "Xóa todo thành công");
    } catch (error) {
      throw new Error(`Lỗi khi xóa todo: ${error.message}`);
    }
  }

  // Xóa tất cả todos
  async deleteAllTodos() {
    try {
      const result = this.todoModel.deleteAll();
      return createResponse(
        true,
        result,
        `Đã xóa ${result.deletedCount} todos`
      );
    } catch (error) {
      throw new Error(`Lỗi khi xóa tất cả todos: ${error.message}`);
    }
  }

  // Lấy thống kê todos
  async getTodoStats() {
    try {
      const stats = this.todoModel.getStats();
      return createResponse(true, stats, "Thống kê todos");
    } catch (error) {
      throw new Error(`Lỗi khi lấy thống kê: ${error.message}`);
    }
  }
}

module.exports = TodoService;
