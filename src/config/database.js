const mongoose = require("mongoose");

// Cấu hình MongoDB
const config = {
  // MongoDB connection string
  mongoURI:
    process.env.MONGO_URI ||
    "mongodb+srv://admin:1234567890Aa@cluster89670.masbwtn.mongodb.net/todos",

  // MongoDB options
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  },

  // Database name
  dbName: "todos",

  // Cấu hình cho database thực
  database: {
    host: process.env.DB_HOST || "cluster89670.masbwtn.mongodb.net",
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || "todos",
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "1234567890Aa",
  },
};

// Kết nối MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoURI, config.mongoOptions);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

// Ngắt kết nối MongoDB
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("✅ MongoDB Disconnected");
  } catch (error) {
    console.error(`❌ MongoDB disconnection error: ${error.message}`);
  }
};

module.exports = {
  config,
  connectDB,
  disconnectDB,
};
