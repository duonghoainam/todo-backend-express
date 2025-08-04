const axios = require("axios");

const BASE_URL = "http://localhost:3000/api";

// Helper function để test API
async function testAPI() {
  console.log("🧪 Bắt đầu test Todo API...\n");

  try {
    // 1. Test lấy tất cả todos
    console.log("1️⃣ Test GET /api/todos");
    const getAllResponse = await axios.get(`${BASE_URL}/todos`);
    console.log(
      "✅ Lấy tất cả todos:",
      getAllResponse.data.data.length,
      "todos"
    );
    console.log(
      "📋 Todos:",
      getAllResponse.data.data.map((t) => ({
        id: t.id,
        title: t.title,
        completed: t.completed,
      }))
    );
    console.log("");

    // 2. Test tạo todo mới
    console.log("2️⃣ Test POST /api/todos");
    const newTodo = {
      title: "Test Todo từ API",
      description: "Đây là todo được tạo từ test script",
    };
    const createResponse = await axios.post(`${BASE_URL}/todos`, newTodo);
    console.log("✅ Tạo todo thành công:", createResponse.data.data.title);
    console.log("🆔 ID mới:", createResponse.data.data.id);
    console.log("");

    // 3. Test lấy todo theo ID
    console.log("3️⃣ Test GET /api/todos/:id");
    const todoId = createResponse.data.data.id;
    const getByIdResponse = await axios.get(`${BASE_URL}/todos/${todoId}`);
    console.log("✅ Lấy todo theo ID:", getByIdResponse.data.data.title);
    console.log("");

    // 4. Test cập nhật todo
    console.log("4️⃣ Test PUT /api/todos/:id");
    const updateData = {
      title: "Todo đã được cập nhật",
      description: "Mô tả mới cho todo",
      completed: true,
    };
    const updateResponse = await axios.put(
      `${BASE_URL}/todos/${todoId}`,
      updateData
    );
    console.log("✅ Cập nhật todo thành công:", updateResponse.data.data.title);
    console.log("✅ Trạng thái completed:", updateResponse.data.data.completed);
    console.log("");

    // 5. Test toggle trạng thái
    console.log("5️⃣ Test PATCH /api/todos/:id/toggle");
    const toggleResponse = await axios.patch(
      `${BASE_URL}/todos/${todoId}/toggle`
    );
    console.log("✅ Toggle trạng thái thành công");
    console.log("✅ Trạng thái mới:", toggleResponse.data.data.completed);
    console.log("");

    // 6. Test filter và search
    console.log("6️⃣ Test filter và search");
    const filterResponse = await axios.get(`${BASE_URL}/todos?completed=false`);
    console.log("✅ Todos chưa hoàn thành:", filterResponse.data.data.length);

    const searchResponse = await axios.get(`${BASE_URL}/todos?search=test`);
    console.log('✅ Todos có từ khóa "test":', searchResponse.data.data.length);
    console.log("");

    // 7. Test thống kê (trước khi xóa todo)
    console.log("7️⃣ Test GET /api/todos/stats");
    const statsResponse = await axios.get(`${BASE_URL}/todos/stats`);
    console.log("✅ Thống kê todos:");
    console.log("   📊 Tổng số:", statsResponse.data.data.total);
    console.log("   ✅ Đã hoàn thành:", statsResponse.data.data.completed);
    console.log("   ⏳ Chưa hoàn thành:", statsResponse.data.data.pending);
    console.log(
      "   📈 Tỷ lệ hoàn thành:",
      statsResponse.data.data.completionRate
    );
    console.log("");

    // 8. Test xóa todo
    console.log("8️⃣ Test DELETE /api/todos/:id");
    const deleteResponse = await axios.delete(`${BASE_URL}/todos/${todoId}`);
    console.log("✅ Xóa todo thành công:", deleteResponse.data.data.title);
    console.log("");

    // 9. Kiểm tra lại danh sách
    console.log("9️⃣ Kiểm tra lại danh sách sau khi xóa");
    const finalResponse = await axios.get(`${BASE_URL}/todos`);
    console.log("✅ Số todos còn lại:", finalResponse.data.data.length);
    console.log("");

    // 10. Test thống kê sau khi xóa
    console.log("🔟 Test thống kê sau khi xóa todo");
    const finalStatsResponse = await axios.get(`${BASE_URL}/todos/stats`);
    console.log("✅ Thống kê cuối cùng:");
    console.log("   📊 Tổng số:", finalStatsResponse.data.data.total);
    console.log("   ✅ Đã hoàn thành:", finalStatsResponse.data.data.completed);
    console.log("   ⏳ Chưa hoàn thành:", finalStatsResponse.data.data.pending);
    console.log(
      "   📈 Tỷ lệ hoàn thành:",
      finalStatsResponse.data.data.completionRate
    );
    console.log("");

    console.log("🎉 Tất cả tests đã hoàn thành thành công!");
  } catch (error) {
    console.error(
      "❌ Lỗi trong quá trình test:",
      error.response?.data || error.message
    );
  }
}

// Chạy test nếu server đang chạy
testAPI();
