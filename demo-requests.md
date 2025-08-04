# Demo API Requests - MongoDB Version

Dưới đây là các lệnh curl để test Todo API với MongoDB:

## 📋 Todo Items API

### 1. Lấy tất cả todo items

```bash
curl http://localhost:3000/api/todos
```

### 2. Lấy todo item theo ID

```bash
curl http://localhost:3000/api/todos/507f1f77bcf86cd799439011
```

### 3. Tạo todo item mới

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Học Node.js",
    "des": "Tìm hiểu về Express.js và MongoDB",
    "todo_group_id": "507f1f77bcf86cd799439012",
    "due_at": "2024-01-20T18:00:00.000Z",
    "status": "todo"
  }'
```

### 4. Cập nhật todo item

```bash
curl -X PUT http://localhost:3000/api/todos/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Học Node.js Advanced",
    "des": "Tìm hiểu sâu về Express.js và MongoDB",
    "due_at": "2024-01-25T18:00:00.000Z",
    "status": "in-progress"
  }'
```

### 5. Toggle trạng thái todo item

```bash
curl -X PATCH http://localhost:3000/api/todos/507f1f77bcf86cd799439011/toggle
```

### 6. Filter todos theo trạng thái

```bash
# Lấy todos có trạng thái todo
curl http://localhost:3000/api/todos?status=todo

# Lấy todos có trạng thái in-progress
curl http://localhost:3000/api/todos?status=in-progress

# Lấy todos có trạng thái finish
curl http://localhost:3000/api/todos?status=finish
```

### 7. Filter todos theo todo list

```bash
curl http://localhost:3000/api/todos?todo_group_id=507f1f77bcf86cd799439012
```

### 8. Tìm kiếm todos

```bash
curl http://localhost:3000/api/todos?search=react
```

### 9. Thống kê todo items

```bash
curl http://localhost:3000/api/todos/stats
```

### 10. Xóa todo item

```bash
curl -X DELETE http://localhost:3000/api/todos/507f1f77bcf86cd799439011
```

### 11. Xóa tất cả todo items

```bash
curl -X DELETE http://localhost:3000/api/todos
```

## 📋 Todo Lists API

### 12. Lấy tất cả todo lists

```bash
curl http://localhost:3000/api/todos/lists
```

### 13. Lấy todo lists theo user

```bash
curl http://localhost:3000/api/todos/lists?user_id=507f1f77bcf86cd799439010
```

### 14. Tạo todo list mới

```bash
curl -X POST http://localhost:3000/api/todos/lists \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dự án web mới",
    "user_id": "507f1f77bcf86cd799439010",
    "status": "unfinished"
  }'
```

## 📊 Thống kê và thông tin

### 15. Xem thông tin API

```bash
curl http://localhost:3000/
```

---

## Test với Postman

Bạn cũng có thể import các requests sau vào Postman:

### Collection JSON cho Postman:

```json
{
  "info": {
    "name": "Todo API - MongoDB",
    "description": "API cho ứng dụng Todo với MongoDB"
  },
  "item": [
    {
      "name": "Get All Todo Items",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/todos"
      }
    },
    {
      "name": "Get Todo Item by ID",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/todos/507f1f77bcf86cd799439011"
      }
    },
    {
      "name": "Create Todo Item",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/api/todos",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Học Node.js\",\n  \"des\": \"Tìm hiểu về Express.js và MongoDB\",\n  \"todo_group_id\": \"507f1f77bcf86cd799439012\",\n  \"due_at\": \"2024-01-20T18:00:00.000Z\",\n  \"status\": \"todo\"\n}"
        }
      }
    },
    {
      "name": "Update Todo Item",
      "request": {
        "method": "PUT",
        "url": "http://localhost:3000/api/todos/507f1f77bcf86cd799439011",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Học Node.js Advanced\",\n  \"status\": \"in-progress\"\n}"
        }
      }
    },
    {
      "name": "Toggle Todo Status",
      "request": {
        "method": "PATCH",
        "url": "http://localhost:3000/api/todos/507f1f77bcf86cd799439011/toggle"
      }
    },
    {
      "name": "Delete Todo Item",
      "request": {
        "method": "DELETE",
        "url": "http://localhost:3000/api/todos/507f1f77bcf86cd799439011"
      }
    },
    {
      "name": "Get Todo Stats",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/todos/stats"
      }
    },
    {
      "name": "Get All Todo Lists",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/todos/lists"
      }
    },
    {
      "name": "Create Todo List",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/api/todos/lists",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Dự án web\",\n  \"user_id\": \"507f1f77bcf86cd799439010\"\n}"
        }
      }
    },
    {
      "name": "Filter Todos by Status",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/todos?status=todo"
      }
    },
    {
      "name": "Filter Todos by Todo List",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/todos?todo_group_id=507f1f77bcf86cd799439012"
      }
    },
    {
      "name": "Search Todos",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/todos?search=react"
      }
    }
  ]
}
```

---

## 🔍 Các tính năng mới

### Virtual Fields trong Response:

- `isOverdue`: Boolean - Todo có quá hạn không
- `timeRemaining`: String - Thời gian còn lại (VD: "2 giờ", "Quá hạn")
- `priority`: String - Mức độ ưu tiên (low/medium/high/overdue/completed)

### Populated References:

- `todo_group_id`: Object với thông tin todo list
- `user_id`: Object với thông tin user

### Advanced Filtering:

- Filter theo status: `todo`, `in-progress`, `finish`
- Filter theo todo list: `todo_group_id`
- Text search: Tìm kiếm theo name và description

### Statistics:

- Tổng số todos
- Số todos đã hoàn thành
- Số todos đang thực hiện
- Số todos chưa bắt đầu
- Tỷ lệ hoàn thành
