# Todo API Server với MongoDB

Một RESTful API đầy đủ cho ứng dụng Todo được xây dựng bằng Express.js và MongoDB với cấu trúc MVC.

## 🏗️ Cấu trúc Database

### Collections trong MongoDB:

#### 1. **User** - Thông tin người dùng

```javascript
{
  _id: ObjectId,
  name: String,           // Tên người dùng
  gender: String,         // F/M
  dob: Date,             // Ngày sinh
  createdAt: Date,
  updatedAt: Date
}
```

#### 2. **Account** - Tài khoản đăng nhập

```javascript
{
  _id: ObjectId,
  user_id: ObjectId,     // Reference to User
  username: String,       // Unique
  hashedPassword: String,
  accessToken: String,
  refreshToken: String,
  status: String,         // active/deactive
  createdAt: Date,
  updatedAt: Date
}
```

#### 3. **TodoList** - Danh sách todo

```javascript
{
  _id: ObjectId,
  name: String,           // Tên danh sách
  user_id: ObjectId,      // Reference to User
  status: String,         // unfinished/finish
  createdAt: Date,
  updatedAt: Date
}
```

#### 4. **TodoItem** - Các item todo

```javascript
{
  _id: ObjectId,
  todo_group_id: ObjectId, // Reference to TodoList
  name: String,            // Tên todo
  des: String,             // Mô tả
  due_at: Date,           // Hạn chót
  status: String,          // todo/in-progress/finish
  createdAt: Date,
  updatedAt: Date
}
```

#### 5. **File** - Quản lý file

```javascript
{
  _id: ObjectId,
  path: String,           // Đường dẫn file
  type: String,           // Loại file
  originalName: String,   // Tên file gốc
  size: Number,           // Kích thước
  mimeType: String,       // MIME type
  uploadedBy: ObjectId,   // Reference to User
  createdAt: Date,
  updatedAt: Date
}
```

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

**Response:**

```json
{
  "success": true,
  "data": [
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
  ],
  "message": "Lấy danh sách todos thành công",
  "timestamp": "2024-01-15T08:00:00.000Z"
}
```

#### 2. Lấy todo item theo ID

```
GET /api/todos/:id
```

**Response:**

```json
{
  "success": true,
  "data": {
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
  },
  "message": "Lấy todo thành công",
  "timestamp": "2024-01-15T08:00:00.000Z"
}
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

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "todo_group_id": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Học tập"
    },
    "name": "Học React",
    "des": "Tìm hiểu về React hooks và context",
    "due_at": "2024-01-20T18:00:00.000Z",
    "status": "todo",
    "createdAt": "2024-01-15T08:00:00.000Z",
    "updatedAt": "2024-01-15T08:00:00.000Z"
  },
  "message": "Tạo todo thành công",
  "timestamp": "2024-01-15T08:00:00.000Z"
}
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

#### 5. Toggle trạng thái todo item

```
PATCH /api/todos/:id/toggle
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "status": "in-progress",
    "updatedAt": "2024-01-15T08:30:00.000Z"
  },
  "message": "Toggle trạng thái thành công",
  "timestamp": "2024-01-15T08:30:00.000Z"
}
```

#### 6. Xóa todo item

```
DELETE /api/todos/:id
```

#### 7. Xóa tất cả todo items

```
DELETE /api/todos
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

**Response:**

```json
{
  "success": true,
  "data": [
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
  ],
  "message": "Lấy danh sách todo lists thành công",
  "timestamp": "2024-01-15T08:00:00.000Z"
}
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

## 🔧 Cách sử dụng API

### Ví dụ với curl:

```bash
# Lấy tất cả todos
curl http://localhost:3000/api/todos

# Lấy todos theo trạng thái
curl http://localhost:3000/api/todos?status=todo

# Lấy todos theo todo list
curl http://localhost:3000/api/todos?todo_group_id=507f1f77bcf86cd799439012

# Tìm kiếm todos
curl http://localhost:3000/api/todos?search=react

# Tạo todo mới
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Học Node.js",
    "des": "Tìm hiểu về Express.js và MongoDB",
    "todo_group_id": "507f1f77bcf86cd799439012",
    "due_at": "2024-01-20T18:00:00.000Z",
    "status": "todo"
  }'

# Cập nhật todo
curl -X PUT http://localhost:3000/api/todos/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Học Node.js Advanced",
    "status": "in-progress"
  }'

# Toggle trạng thái
curl -X PATCH http://localhost:3000/api/todos/507f1f77bcf86cd799439011/toggle

# Lấy thống kê
curl http://localhost:3000/api/todos/stats

# Lấy todo lists
curl http://localhost:3000/api/todos/lists

# Tạo todo list mới
curl -X POST http://localhost:3000/api/todos/lists \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dự án web",
    "user_id": "507f1f77bcf86cd799439010"
  }'
```

## 📊 Thống kê Database

Sau khi chạy `npm run seed`, database sẽ có:

- **2 Users** với thông tin cá nhân
- **2 Accounts** để đăng nhập
- **3 Todo Lists** cho các nhóm công việc khác nhau
- **7 Todo Items** với các trạng thái và deadline khác nhau

## 🔗 Kết nối MongoDB

Database được kết nối tới:

```
mongodb+srv://admin:1234567890Aa@cluster89670.masbwtn.mongodb.net/todos
```

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

## ✨ Tính năng nổi bật

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

### 👥 User Management:

- ✅ **User Profiles** với thông tin cá nhân
- ✅ **Account System** với authentication
- ✅ **Age Calculation** tự động
- ✅ **Gender Validation** (F/M)

### 📁 File Management:

- ✅ **File Upload** system
- ✅ **File Type Detection**
- ✅ **Size Formatting**
- ✅ **MIME Type Validation**

### 🔍 Advanced Features:

- ✅ **Priority Calculation** dựa trên due date
- ✅ **Overdue Detection** tự động
- ✅ **Time Remaining** với format thân thiện
- ✅ **Completion Rate** cho todo lists
- ✅ **Populated References** với thông tin đầy đủ

## 🔧 Environment Variables

Tạo file `.env` (optional):

```env
# Server Configuration
PORT=3000
HOST=localhost
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb+srv://admin:1234567890Aa@cluster89670.masbwtn.mongodb.net/todos
DB_HOST=cluster89670.masbwtn.mongodb.net
DB_PORT=27017
DB_NAME=todos
DB_USER=admin
DB_PASSWORD=1234567890Aa

# API Configuration
CORS_ORIGIN=*

# Logging
LOG_LEVEL=info
```

## 📈 Performance Optimizations

### Indexes:

- **User**: `name`, `gender`, `dob`
- **Account**: `username`, `user_id`, `status`
- **TodoList**: `user_id`, `status`, `name`
- **TodoItem**: `todo_group_id`, `status`, `due_at`, `name`
- **File**: `uploadedBy`, `type`, `mimeType`

### Compound Indexes:

- `Account`: `{username: 1, status: 1}`
- `TodoList`: `{user_id: 1, status: 1}`
- `TodoItem`: `{todo_group_id: 1, status: 1}`, `{status: 1, due_at: 1}`

### Text Search:

- `TodoItem`: `{name: 'text', des: 'text'}`

## 🚨 Error Handling

### HTTP Status Codes:

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
