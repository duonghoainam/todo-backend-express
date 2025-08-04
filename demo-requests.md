# Demo API Requests

Dưới đây là các lệnh curl để test Todo API:

## 1. Lấy tất cả todos

```bash
curl http://localhost:3000/api/todos
```

## 2. Lấy todo theo ID

```bash
curl http://localhost:3000/api/todos/1
```

## 3. Tạo todo mới

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Học Node.js",
    "description": "Tìm hiểu về Node.js và Express"
  }'
```

## 4. Cập nhật todo

```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Học Node.js Advanced",
    "description": "Tìm hiểu sâu về Node.js",
    "completed": true
  }'
```

## 5. Toggle trạng thái completed

```bash
curl -X PATCH http://localhost:3000/api/todos/1/toggle
```

## 6. Filter todos theo trạng thái

```bash
# Lấy todos đã hoàn thành
curl http://localhost:3000/api/todos?completed=true

# Lấy todos chưa hoàn thành
curl http://localhost:3000/api/todos?completed=false
```

## 7. Tìm kiếm todos

```bash
curl http://localhost:3000/api/todos?search=express
```

## 8. Thống kê todos

```bash
curl http://localhost:3000/api/todos/stats
```

## 9. Xóa todo

```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

## 10. Xóa tất cả todos

```bash
curl -X DELETE http://localhost:3000/api/todos
```

## 11. Xem thông tin API

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
    "name": "Todo API",
    "description": "API cho ứng dụng Todo"
  },
  "item": [
    {
      "name": "Get All Todos",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/todos"
      }
    },
    {
      "name": "Get Todo by ID",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/todos/1"
      }
    },
    {
      "name": "Create Todo",
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
          "raw": "{\n  \"title\": \"Học Node.js\",\n  \"description\": \"Tìm hiểu về Node.js\"\n}"
        }
      }
    },
    {
      "name": "Update Todo",
      "request": {
        "method": "PUT",
        "url": "http://localhost:3000/api/todos/1",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"Học Node.js Advanced\",\n  \"completed\": true\n}"
        }
      }
    },
    {
      "name": "Toggle Todo Status",
      "request": {
        "method": "PATCH",
        "url": "http://localhost:3000/api/todos/1/toggle"
      }
    },
    {
      "name": "Delete Todo",
      "request": {
        "method": "DELETE",
        "url": "http://localhost:3000/api/todos/1"
      }
    },
    {
      "name": "Get Stats",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/todos/stats"
      }
    }
  ]
}
```
