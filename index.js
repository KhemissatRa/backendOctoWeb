const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

// CORS
const origins = [
  "http://localhost:5173",
  "https://admin-dashboard-octoweb.vercel.app",
  "https://octo-web-eight.vercel.app/"
];

app.use(cors({
  origin: origins
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
    app.use('/', require('./route/product'));
    app.use('/', require('./route/order'));
    app.use('/', require('./route/admin'));

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
