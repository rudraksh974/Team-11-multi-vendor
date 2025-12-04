// backend/test-socket-client.js
const { io } = require("socket.io-client");

const socket = io("http://localhost:5000", { transports: ["websocket"] });

socket.on("connect", () => {
  console.log("Connected test client:", socket.id);

  // Listen for orders (as a restaurant: join restaurant room "r1")
  socket.emit("join_restaurant", "r1");
  socket.on("new_order_for_restaurant", (order) => {
    console.log("New order for r1:", order);
  });

  // Listen for specific order updates (as a customer)
  socket.emit("join_order", "order_demo_1");
  socket.on("order_updated", (data) => {
    console.log("Order updated:", data);
  });

  // After 1s, emit a fake order_placed to test pipeline
  setTimeout(() => {
    socket.emit("order_placed", { _id: "order_demo_1", restaurantId: "r1", items: [] });
    console.log("Sent test order_placed");
  }, 1000);
});

socket.on("disconnect", () => console.log("Test client disconnected"));
