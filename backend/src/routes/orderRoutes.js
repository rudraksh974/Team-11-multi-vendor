const router = require("express").Router();
const auth = require("../middleware/auth");
const { createOrder, getOrder, updateOrder } = require("../controllers/orderController");

router.post("/", auth, createOrder);
router.get("/:id", auth, getOrder);
router.put("/:id/status", auth, updateOrder);

module.exports = router;
