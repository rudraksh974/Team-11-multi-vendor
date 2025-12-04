const Restaurant = require("../models/Restaurant");

exports.getRestaurants = async (req, res) => {
  const data = await Restaurant.find().select("name cuisine rating");
  res.json(data);
};

exports.getRestaurantById = async (req, res) => {
  const data = await Restaurant.findById(req.params.id);
  res.json(data);
};
