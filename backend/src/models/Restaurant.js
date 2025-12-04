const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  isAvailable: { type: Boolean, default: true },
});

const restaurantSchema = new mongoose.Schema(
  {
    ownerUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    cuisine: String,
    address: String,
    rating: { type: Number, default: 4.0 },
    menu: [menuItemSchema], // embedded menu for fast read
  },
  { timestamps: true }
);

// optional text search index
restaurantSchema.index({ name: "text", cuisine: "text" });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
