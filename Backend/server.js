// server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

/* ================== APP SETUP ================== */
const app = express();

app.use(cors());
app.use(express.json());

/* ================== ROUTES ================== */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/location", require("./routes/locationRoutes"));

app.use("/api/worker-services", require("./routes/workerServices.routes"));
app.use("/api/customer", require("./routes/customerWorkers.routes"));
app.use("/api/customer", require("./routes/customer"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/worker", require("./routes/worker"));

/* ================== SOCKET.IO SETUP ================== */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

/* ================== SOCKET EVENTS ================== */
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`👤 User joined room: ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

/* ✅ Make io globally accessible */
global.io = io;

/* ================== START SERVER ================== */
const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
