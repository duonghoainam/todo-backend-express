# Todo API Server

Một RESTful API đầy đủ cho ứng dụng Todo được xây dựng bằng Express.js.

## 🚀 Cài đặt và Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy server
node index.js
```

Server sẽ chạy tại: `http://localhost:3000`

## 📚 API Endpoints

### 1. Lấy tất cả todos

```
GET /api/todos
```

**Query Parameters:**

- `completed` (optional): Filter theo trạng thái (true/false)
- `search` (optional): Tìm kiếm theo title hoặc description

**Ví dụ:**

```bash
# Lấy tất cả todos
curl http://localhost:3000/api/todos

# Lấy todos đã hoàn thành
curl http://localhost:3000/api/todos?completed=true

# Tìm kiếm todos
curl http://localhost:3000/api/todos?search=express
```

### 2. Lấy todo theo ID

```
GET /api/todos/:id
```

**Ví dụ:**

```bash
curl http://localhost:3000/api/todos/1
```

### 3. Tạo todo mới

```
POST /api/todos
```

**Body:**

```json
{
  "title": "Tiêu đề todo",
  "description": "Mô tả todo (optional)"
}
```

**Ví dụ:**

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Học Node.js", "description": "Tìm hiểu về Node.js"}'
```

### 4. Cập nhật todo

```
PUT /api/todos/:id
```

**Body:**

```json
{
  "title": "Tiêu đề mới",
  "description": "Mô tả mới",
  "completed": true
}
```

**Ví dụ:**

```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Học Node.js Advanced", "completed": true}'
```

### 5. Toggle trạng thái completed

```
PATCH /api/todos/:id/toggle
```

**Ví dụ:**

```bash
curl -X PATCH http://localhost:3000/api/todos/1/toggle
```

### 6. Xóa todo

```
DELETE /api/todos/:id
```

**Ví dụ:**

```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

### 7. Xóa tất cả todos

```
DELETE /api/todos
```

**Ví dụ:**

```bash
curl -X DELETE http://localhost:3000/api/todos
```

### 8. Thống kê todos

```
GET /api/todos/stats
```

**Response:**

```json
{
  "success": true,
  "data": {
    "total": 5,
    "completed": 3,
    "pending": 2,
    "completionRate": "60%"
  },
  "message": "Thống kê todos",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 📋 Cấu trúc Todo Object

```json
{
  "id": 1,
  "title": "Tiêu đề todo",
  "description": "Mô tả todo",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🔧 Response Format

Tất cả API responses đều theo format chuẩn:

```json
{
  "success": true,
  "data": {...},
  "message": "Thông báo",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🚨 Error Handling

- **400 Bad Request**: Dữ liệu đầu vào không hợp lệ
- **404 Not Found**: Không tìm thấy resource
- **500 Internal Server Error**: Lỗi server

## 🛠️ Tính năng

- ✅ CRUD operations đầy đủ
- ✅ Tìm kiếm và filter
- ✅ Validation dữ liệu
- ✅ Error handling
- ✅ Response format chuẩn
- ✅ Thống kê todos
- ✅ Toggle trạng thái nhanh
- ✅ In-memory storage (có thể dễ dàng chuyển sang database)

## 🔮 Mở rộng trong tương lai

- Database integration (MongoDB, PostgreSQL)
- Authentication & Authorization
- Pagination
- Sorting
- File upload
- Real-time updates với WebSocket
