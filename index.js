const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

// CORS
app.use(cors({
  origin: "https://admin-dashboard-octoweb.vercel.app", // replace with your frontend
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug TLS & Mongo URL (remove in production)
console.log("Node TLS version:", process.versions.openssl);

// DB
const connectDB = require('./db/db');

const startServer = async () => {
  try {
    await connectDB();

    // Routes
    app.use('/api/products', require('./route/product'));
    app.use('/api/orders', require('./route/order'));
    app.use('/api/admin', require('./route/admin'));

    // Start server
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
