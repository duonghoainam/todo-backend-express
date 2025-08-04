const dbConfig = require("../config/database");

class Todo {
  constructor() {
    this.todos = [...dbConfig.storage.todos];
    this.nextId = dbConfig.storage.nextId;
  }

  // Lấy tất cả todos
  findAll(filters = {}) {
    let filteredTodos = [...this.todos];

    // Filter theo trạng thái completed
    if (filters.completed !== undefined) {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.completed === filters.completed
      );
    }

    // Filter theo từ khóa tìm kiếm
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredTodos = filteredTodos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchLower) ||
          todo.description.toLowerCase().includes(searchLower)
      );
    }

    return filteredTodos;
  }

  // Lấy todo theo ID
  findById(id) {
    return this.todos.find((todo) => todo.id === parseInt(id));
  }

  // Tạo todo mới
  create(todoData) {
    const newTodo = {
      id: this.nextId++,
      title: todoData.title.trim(),
      description: todoData.description ? todoData.description.trim() : "",
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.todos.push(newTodo);
    return newTodo;
  }

  // Cập nhật todo
  update(id, updateData) {
    const todo = this.findById(id);
    if (!todo) return null;

    if (updateData.title !== undefined) todo.title = updateData.title.trim();
    if (updateData.description !== undefined)
      todo.description = updateData.description.trim();
    if (updateData.completed !== undefined)
      todo.completed = Boolean(updateData.completed);

    todo.updatedAt = new Date().toISOString();
    return todo;
  }

  // Toggle trạng thái completed
  toggle(id) {
    const todo = this.findById(id);
    if (!todo) return null;

    todo.completed = !todo.completed;
    todo.updatedAt = new Date().toISOString();
    return todo;
  }

  // Xóa todo
  delete(id) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === parseInt(id));
    if (todoIndex === -1) return null;

    return this.todos.splice(todoIndex, 1)[0];
  }

  // Xóa tất cả todos
  deleteAll() {
    const deletedCount = this.todos.length;
    this.todos = [];
    return { deletedCount };
  }

  // Thống kê todos
  getStats() {
    const total = this.todos.length;
    const completed = this.todos.filter((todo) => todo.completed).length;
    const pending = total - completed;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      completionRate: `${completionRate}%`,
    };
  }

  // Lưu trạng thái hiện tại (cho in-memory storage)
  save() {
    // Trong thực tế, đây sẽ là nơi lưu vào database
    // Hiện tại chỉ là placeholder
    return true;
  }
}

module.exports = Todo;
