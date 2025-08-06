# Database Relationships - Simple View

## 🗄️ Sơ đồ mối quan hệ đơn giản

```
┌─────────────┐    1:1    ┌─────────────┐
│    User     │◄─────────►│   Account   │
│             │            │             │
│ - _id       │            │ - _id       │
│ - name      │            │ - user_id   │
│ - gender    │            │ - username  │
│ - dob       │            │ - password  │
│ - createdAt │            │ - status    │
│ - updatedAt │            │ - createdAt │
└─────────────┘            └─────────────┘
       │
       │ 1:N
       ▼
┌─────────────┐    1:N    ┌─────────────┐
│  TodoList   │◄─────────►│  TodoItem   │
│             │            │             │
│ - _id       │            │ - _id       │
│ - name      │            │ - name      │
│ - user_id   │            │ - des       │
│ - status    │            │ - due_at    │
│ - createdAt │            │ - status    │
│ - updatedAt │            │ - todo_group_id
└─────────────┘            │ - createdAt │
                           │ - updatedAt │
                           └─────────────┘
       │
       │ 1:N
       ▼
┌─────────────┐
│    File     │
│             │
│ - _id       │
│ - path      │
│ - type      │
│ - size      │
│ - uploadedBy│
│ - createdAt │
│ - updatedAt │
└─────────────┘
```

## 📊 Mối quan hệ chi tiết

### 1. **User → Account** (1:1)

```
User (1) ────── (1) Account
  │                │
  │                │
  └── user_id ─────┘
```

**Ý nghĩa**: Mỗi user có 1 account để đăng nhập

### 2. **User → TodoList** (1:N)

```
User (1) ────── (N) TodoList
  │                │
  │                │
  └── user_id ─────┘
```

**Ý nghĩa**: Mỗi user có thể tạo nhiều todo lists

### 3. **TodoList → TodoItem** (1:N)

```
TodoList (1) ─── (N) TodoItem
    │                │
    │                │
    └── _id ─────────┘
```

**Ý nghĩa**: Mỗi todo list chứa nhiều todo items

### 4. **User → File** (1:N)

```
User (1) ────── (N) File
  │                │
  │                │
  └── _id ─────────┘
```

**Ý nghĩa**: Mỗi user có thể upload nhiều files

## 🔍 Các trường quan trọng

### Foreign Keys:

- `Account.user_id` → `User._id`
- `TodoList.user_id` → `User._id`
- `TodoItem.todo_group_id` → `TodoList._id`
- `File.uploadedBy` → `User._id`

### Virtual Fields:

- **TodoItem**: `isOverdue`, `timeRemaining`, `priority`
- **TodoList**: `todoCount`, `completedCount`, `completionRate`
- **User**: `age`
- **File**: `url`, `formattedSize`, `isImage`, `isDocument`

## 📈 Ví dụ dữ liệu thực tế

### User:

```json
{
  "_id": "507f1f77bcf86cd799439010",
  "name": "Nguyễn Văn A",
  "gender": "M",
  "dob": "1990-01-15T00:00:00.000Z",
  "age": 34
}
```

### Account:

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "user_id": "507f1f77bcf86cd799439010",
  "username": "nguyenvana",
  "status": "active"
}
```

### TodoList:

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Công việc hàng ngày",
  "user_id": "507f1f77bcf86cd799439010",
  "status": "unfinished",
  "todoCount": 3,
  "completedCount": 1,
  "completionRate": 33
}
```

### TodoItem:

```json
{
  "_id": "507f1f77bcf86cd799439013",
  "todo_group_id": "507f1f77bcf86cd799439012",
  "name": "Đọc email",
  "des": "Kiểm tra và trả lời email quan trọng",
  "due_at": "2024-01-15T10:00:00.000Z",
  "status": "todo",
  "isOverdue": false,
  "timeRemaining": "2 giờ",
  "priority": "high"
}
```

## 🔄 Luồng dữ liệu

```
1. User đăng ký → Tạo User + Account
2. User đăng nhập → Xác thực qua Account
3. User tạo TodoList → Liên kết với User
4. User tạo TodoItem → Liên kết với TodoList
5. User upload File → Liên kết với User
```

## 🎯 Lợi ích của cấu trúc này

1. **Tính mô-đun**: Mỗi collection có trách nhiệm riêng
2. **Tính mở rộng**: Dễ dàng thêm tính năng mới
3. **Tính bảo mật**: User chỉ truy cập dữ liệu của mình
4. **Tính hiệu suất**: Indexes được tối ưu cho query phổ biến
5. **Tính linh hoạt**: Virtual fields tính toán động
