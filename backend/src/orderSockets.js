// src/sockets/orderSockets.js
module.exports = function registerOrderSockets(io) {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // CUSTOMER joins an order room to receive updates for that order
    socket.on("join_order", (orderId) => {
      if (!orderId) return;
      socket.join(`order:${orderId}`);
      console.log(`${socket.id} joined order:${orderId}`);
    });

    // RESTAURANT or SERVER can join restaurant room to receive new orders
    socket.on("join_restaurant", (restaurantId) => {
      if (!restaurantId) return;
      socket.join(`restaurant:${restaurantId}`);
      console.log(`${socket.id} joined restaurant:${restaurantId}`);
    });

    // Example: Customer emits order_placed (optional — controllers can also emit)
    socket.on("order_placed", (order) => {
      // order should contain at least { _id, restaurantId, ... }
      if (order && order.restaurantId) {
        const room = `restaurant:${order.restaurantId}`;
        io.to(room).emit("new_order_for_restaurant", order);
        console.log("Emitted new_order_for_restaurant ->", room, order._id || "");
      }
    });

    // Restaurant updates order status (can come from socket or REST API)
    socket.on("order_status_update", (payload) => {
      // payload: { orderId, status, ... }
      if (payload && payload.orderId) {
        io.to(`order:${payload.orderId}`).emit("order_updated", payload);
        console.log("Emitted order_updated ->", payload.orderId, payload.status);
      }
    });

    // Delivery assignment broadcast (simple example)
    socket.on("delivery_assigned", (payload) => {
      // payload might contain deliveryId, orderId, driver info
      io.emit("delivery_assigned", payload);
      console.log("Emitted delivery_assigned", payload);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", socket.id, reason || "");
    });
  });
};
