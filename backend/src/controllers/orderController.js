const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const order = await Order.create({
    customerId: req.user.userId,
    restaurantId: req.body.restaurantId,
    items: req.body.items,
    status: "PLACED"
  });

  req.app.get("io").emit("new_order", order);
  res.status(201).json(order);
};

exports.getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
};

exports.updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  req.app.get("io").emit("order_updated", order);
  res.json(order);
};
