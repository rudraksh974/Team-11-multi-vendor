const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);

// HTTP + Socket.io
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Make io available to controllers
app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`🔥 Server running at http://localhost:${process.env.PORT || 5000}`)
);
