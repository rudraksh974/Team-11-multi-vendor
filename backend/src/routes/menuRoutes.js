import express from "express";
import {
  addMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

const router = express.Router();

// Dummy admin middleware
const verifyAdmin = (req, res, next) => {
  // TODO: Replace this with real JWT admin auth
  next();
};

// Public Route
router.get("/", getMenuItems);
router.get("/:id", getMenuItemById);

// Admin Routes
router.post("/", verifyAdmin, addMenuItem);
router.put("/:id", verifyAdmin, updateMenuItem);
router.delete("/:id", verifyAdmin, deleteMenuItem);

export default router;
