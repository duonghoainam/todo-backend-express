# Todo API Server với MongoDB

Một RESTful API đầy đủ cho ứng dụng Todo được xây dựng bằng Express.js và MongoDB với cấu trúc MVC.

## 🚀 Cài đặt và Chạy

```bash
# Cài đặt dependencies
npm install

# Seed dữ liệu mẫu
npm run seed

# Chạy server
npm start

# Chạy với nodemon (development)
npm run dev
```

Server sẽ chạy tại: `http://localhost:3000`

## 📚 API Endpoints

### 🔗 Base URL: `http://localhost:3000/api`

### 📋 Todo Items API

#### 1. Lấy tất cả todo items

```
GET /api/todos
```

**Query Parameters:**

- `status` (optional): Filter theo trạng thái (todo/in-progress/finish)
- `todo_group_id` (optional): Filter theo todo list
- `search` (optional): Tìm kiếm theo name hoặc description

**Ví dụ:**

```bash
# Lấy tất cả todos
curl http://localhost:3000/api/todos

# Lấy todos theo trạng thái
curl http://localhost:3000/api/todos?status=todo

# Lấy todos theo todo list
curl http://localhost:3000/api/todos?todo_group_id=507f1f77bcf86cd799439012

# Tìm kiếm todos
curl http://localhost:3000/api/todos?search=react
```

#### 2. Lấy todo item theo ID

```
GET /api/todos/:id
```

**Ví dụ:**

```bash
curl http://localhost:3000/api/todos/507f1f77bcf86cd799439011
```

#### 3. Tạo todo item mới

```
POST /api/todos
```

**Body:**

```json
{
  "name": "Học React",
  "des": "Tìm hiểu về React hooks và context",
  "todo_group_id": "507f1f77bcf86cd799439012",
  "due_at": "2024-01-20T18:00:00.000Z",
  "status": "todo"
}
```

**Ví dụ:**

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

#### 4. Cập nhật todo item

```
PUT /api/todos/:id
```

**Body:**

```json
{
  "name": "Học React Advanced",
  "des": "Tìm hiểu sâu về React hooks và context",
  "due_at": "2024-01-25T18:00:00.000Z",
  "status": "in-progress"
}
```

**Ví dụ:**

```bash
curl -X PUT http://localhost:3000/api/todos/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Học Node.js Advanced",
    "status": "in-progress"
  }'
```

#### 5. Toggle trạng thái todo item

```
PATCH /api/todos/:id/toggle
```

**Ví dụ:**

```bash
curl -X PATCH http://localhost:3000/api/todos/507f1f77bcf86cd799439011/toggle
```

#### 6. Xóa todo item

```
DELETE /api/todos/:id
```

**Ví dụ:**

```bash
curl -X DELETE http://localhost:3000/api/todos/507f1f77bcf86cd799439011
```

#### 7. Xóa tất cả todo items

```
DELETE /api/todos
```

**Ví dụ:**

```bash
curl -X DELETE http://localhost:3000/api/todos
```

#### 8. Thống kê todo items

```
GET /api/todos/stats
```

**Response:**

```json
{
  "success": true,
  "data": {
    "total": 7,
    "completed": 1,
    "inProgress": 2,
    "pending": 4,
    "completionRate": "14%"
  },
  "message": "Thống kê todos",
  "timestamp": "2024-01-15T08:00:00.000Z"
}
```

### 📋 Todo Lists API

#### 9. Lấy tất cả todo lists

```
GET /api/todos/lists
```

**Query Parameters:**

- `user_id` (optional): Filter theo user

**Ví dụ:**

```bash
curl http://localhost:3000/api/todos/lists
curl http://localhost:3000/api/todos/lists?user_id=507f1f77bcf86cd799439010
```

#### 10. Tạo todo list mới

```
POST /api/todos/lists
```

**Body:**

```json
{
  "name": "Dự án mới",
  "user_id": "507f1f77bcf86cd799439010",
  "status": "unfinished"
}
```

**Ví dụ:**

```bash
curl -X POST http://localhost:3000/api/todos/lists \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dự án web",
    "user_id": "507f1f77bcf86cd799439010"
  }'
```

## 📋 Cấu trúc Todo Item Object

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "todo_group_id": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Công việc hàng ngày"
  },
  "name": "Đọc email",
  "des": "Kiểm tra và trả lời email quan trọng",
  "due_at": "2024-01-15T10:00:00.000Z",
  "status": "todo",
  "isOverdue": false,
  "timeRemaining": "2 giờ",
  "priority": "high",
  "createdAt": "2024-01-15T08:00:00.000Z",
  "updatedAt": "2024-01-15T08:00:00.000Z"
}
```

## 📋 Cấu trúc Todo List Object

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Công việc hàng ngày",
  "user_id": {
    "_id": "507f1f77bcf86cd799439010",
    "name": "Nguyễn Văn A"
  },
  "status": "unfinished",
  "todoCount": 3,
  "completedCount": 1,
  "completionRate": 33,
  "createdAt": "2024-01-15T08:00:00.000Z",
  "updatedAt": "2024-01-15T08:00:00.000Z"
}
```

## 🔧 Response Format

Tất cả API responses đều theo format chuẩn:

```json
{
  "success": true,
  "data": {...},
  "message": "Thông báo",
  "timestamp": "2024-01-15T08:00:00.000Z"
}
```

## 🚨 Error Handling

- **200 OK**: Request thành công
- **201 Created**: Tạo resource thành công
- **400 Bad Request**: Dữ liệu đầu vào không hợp lệ
- **404 Not Found**: Không tìm thấy resource
- **500 Internal Server Error**: Lỗi server

### Error Response Format:

```json
{
  "success": false,
  "data": null,
  "message": "Mô tả lỗi",
  "timestamp": "2024-01-15T08:00:00.000Z"
}
```

## 🛠️ Tính năng

### 🗄️ Database Features:

- ✅ **MongoDB Integration** với Mongoose ODM
- ✅ **Schema Validation** chặt chẽ
- ✅ **Indexes** để tối ưu performance
- ✅ **Virtual Fields** để tính toán động
- ✅ **Relationships** giữa các collections
- ✅ **Timestamps** tự động

### 📋 Todo Features:

- ✅ **CRUD Operations** đầy đủ cho Todo Items và Todo Lists
- ✅ **Status Management** (todo/in-progress/finish)
- ✅ **Due Date Tracking** với priority calculation
- ✅ **Overdue Detection** tự động
- ✅ **Time Remaining** calculation
- ✅ **Search & Filter** nâng cao
- ✅ **Text Search** với MongoDB text indexes

### 🔍 Advanced Features:

- ✅ **Priority Calculation** dựa trên due date
- ✅ **Overdue Detection** tự động
- ✅ **Time Remaining** với format thân thiện
- ✅ **Completion Rate** cho todo lists
- ✅ **Populated References** với thông tin đầy đủ

## 🏗️ Cấu trúc Project

```
src/
├── config/
│   ├── app.js          # Cấu hình ứng dụng
│   └── database.js     # Cấu hình MongoDB
├── models/
│   ├── User.js         # Model User
│   ├── Account.js      # Model Account
│   ├── TodoList.js     # Model TodoList
│   ├── TodoItem.js     # Model TodoItem
│   ├── File.js         # Model File
│   └── index.js        # Export tất cả models
├── controllers/
│   └── todoController.js
├── services/
│   └── todoService.js
├── routes/
│   └── todoRoutes.js
├── middlewares/
│   └── errorHandler.js
├── validations/
│   └── todoValidation.js
├── utils/
│   ├── response.js
│   └── seedData.js     # Script seed dữ liệu
├── jobs/
│   └── index.js
├── app.js
└── server.js
```

## 🔗 Kết nối MongoDB

Database được kết nối tới:

```
mongodb+srv://admin:1234567890Aa@cluster89670.masbwtn.mongodb.net/todos
```

## 📊 Thống kê Database

Sau khi chạy `npm run seed`, database sẽ có:

- **2 Users** với thông tin cá nhân
- **2 Accounts** để đăng nhập
- **3 Todo Lists** cho các nhóm công việc khác nhau
- **7 Todo Items** với các trạng thái và deadline khác nhau

## 🔮 Mở rộng trong tương lai

- **Authentication & Authorization** với JWT
- **File Upload** với multer
- **Real-time Updates** với Socket.io
- **Background Jobs** với node-cron
- **Caching** với Redis
- **API Rate Limiting**
- **Logging** với Winston
- **Testing** với Jest
- **Documentation** với Swagger
- **User Management APIs**
- **File Management APIs**
