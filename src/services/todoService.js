const { TodoItem, TodoList } = require("../models");
const { createResponse } = require("../utils/response");

class TodoService {
  constructor() {
    // Không cần khởi tạo gì vì sử dụng MongoDB models
  }

  // Lấy tất cả todo items
  async getAllTodos(filters = {}) {
    try {
      let query = {};

      // Filter theo trạng thái
      if (filters.status) {
        query.status = filters.status;
      }

      // Filter theo todo group
      if (filters.todo_group_id) {
        query.todo_group_id = filters.todo_group_id;
      }

      // Filter theo từ khóa tìm kiếm
      if (filters.search) {
        query.$text = { $search: filters.search };
      }

      const todos = await TodoItem.find(query)
        .populate("todo_group_id", "name")
        .sort({ createdAt: -1 });

      return createResponse(true, todos, "Lấy danh sách todos thành công");
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách todos: ${error.message}`);
    }
  }

  // Lấy todo theo ID
  async getTodoById(id) {
    try {
      const todo = await TodoItem.findById(id).populate(
        "todo_group_id",
        "name"
      );
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
      if (!todoData.name || todoData.name.trim() === "") {
        return createResponse(false, null, "Tên todo là bắt buộc");
      }

      if (!todoData.todo_group_id) {
        return createResponse(false, null, "Todo group ID là bắt buộc");
      }

      if (!todoData.due_at) {
        return createResponse(false, null, "Hạn chót là bắt buộc");
      }

      const newTodo = await TodoItem.create({
        todo_group_id: todoData.todo_group_id,
        name: todoData.name.trim(),
        des: todoData.des ? todoData.des.trim() : "",
        due_at: new Date(todoData.due_at),
        status: todoData.status || "todo",
      });

      const populatedTodo = await TodoItem.findById(newTodo._id).populate(
        "todo_group_id",
        "name"
      );
      return createResponse(true, populatedTodo, "Tạo todo thành công");
    } catch (error) {
      throw new Error(`Lỗi khi tạo todo: ${error.message}`);
    }
  }

  // Cập nhật todo
  async updateTodo(id, updateData) {
    try {
      // Validation
      if (updateData.name !== undefined && updateData.name.trim() === "") {
        return createResponse(false, null, "Tên todo không được để trống");
      }

      const updatedTodo = await TodoItem.findByIdAndUpdate(
        id,
        {
          ...updateData,
          ...(updateData.name && { name: updateData.name.trim() }),
          ...(updateData.des && { des: updateData.des.trim() }),
          ...(updateData.due_at && { due_at: new Date(updateData.due_at) }),
          updatedAt: new Date(),
        },
        { new: true, runValidators: true }
      ).populate("todo_group_id", "name");

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
      const todo = await TodoItem.findById(id);
      if (!todo) {
        return createResponse(false, null, "Không tìm thấy todo");
      }

      // Chuyển đổi trạng thái theo thứ tự: todo -> in-progress -> finish -> todo
      const statusOrder = ["todo", "in-progress", "finish"];
      const currentIndex = statusOrder.indexOf(todo.status);
      const nextIndex = (currentIndex + 1) % statusOrder.length;
      todo.status = statusOrder[nextIndex];
      todo.updatedAt = new Date();

      await todo.save();
      const populatedTodo = await TodoItem.findById(id).populate(
        "todo_group_id",
        "name"
      );

      return createResponse(
        true,
        populatedTodo,
        "Toggle trạng thái thành công"
      );
    } catch (error) {
      throw new Error(`Lỗi khi toggle todo: ${error.message}`);
    }
  }

  // Xóa todo
  async deleteTodo(id) {
    try {
      const deletedTodo = await TodoItem.findByIdAndDelete(id);
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
      const result = await TodoItem.deleteMany({});
      return createResponse(
        true,
        { deletedCount: result.deletedCount },
        `Đã xóa ${result.deletedCount} todos`
      );
    } catch (error) {
      throw new Error(`Lỗi khi xóa tất cả todos: ${error.message}`);
    }
  }

  // Lấy thống kê todos
  async getTodoStats() {
    try {
      const total = await TodoItem.countDocuments();
      const completed = await TodoItem.countDocuments({ status: "finish" });
      const inProgress = await TodoItem.countDocuments({
        status: "in-progress",
      });
      const pending = await TodoItem.countDocuments({ status: "todo" });
      const completionRate =
        total > 0 ? Math.round((completed / total) * 100) : 0;

      const stats = {
        total,
        completed,
        inProgress,
        pending,
        completionRate: `${completionRate}%`,
      };

      return createResponse(true, stats, "Thống kê todos");
    } catch (error) {
      throw new Error(`Lỗi khi lấy thống kê: ${error.message}`);
    }
  }

  // Lấy tất cả todo lists
  async getAllTodoLists(userId) {
    try {
      const query = userId ? { user_id: userId } : {};
      const todoLists = await TodoList.find(query)
        .populate("user_id", "name")
        .sort({ createdAt: -1 });

      return createResponse(
        true,
        todoLists,
        "Lấy danh sách todo lists thành công"
      );
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách todo lists: ${error.message}`);
    }
  }

  // Tạo todo list mới
  async createTodoList(todoListData) {
    try {
      if (!todoListData.name || todoListData.name.trim() === "") {
        return createResponse(false, null, "Tên danh sách là bắt buộc");
      }

      if (!todoListData.user_id) {
        return createResponse(false, null, "User ID là bắt buộc");
      }

      const newTodoList = await TodoList.create({
        name: todoListData.name.trim(),
        user_id: todoListData.user_id,
        status: todoListData.status || "unfinished",
      });

      const populatedTodoList = await TodoList.findById(
        newTodoList._id
      ).populate("user_id", "name");
      return createResponse(
        true,
        populatedTodoList,
        "Tạo todo list thành công"
      );
    } catch (error) {
      throw new Error(`Lỗi khi tạo todo list: ${error.message}`);
    }
  }
}

module.exports = TodoService;
