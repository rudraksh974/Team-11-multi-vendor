const router = require("express").Router();
const { getRestaurants, getRestaurantById } = require("../controllers/restaurantController");

router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);

module.exports = router;
