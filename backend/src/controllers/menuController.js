import Menu from "../models/Menu.js";

// Add Menu Item (Admin)
export const addMenuItem = async (req, res) => {
  try {
    const newItem = new Menu(req.body);
    await newItem.save();
    res.status(201).json({ message: "Menu item added", newItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Menu Items (Public)
export const getMenuItems = async (req, res) => {
  try {
    const items = await Menu.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Menu Item
export const getMenuItemById = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Menu Item (Admin)
export const updateMenuItem = async (req, res) => {
  try {
    const updated = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Menu item not found" });
    res.status(200).json({ message: "Menu item updated", updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Menu Item (Admin)
export const deleteMenuItem = async (req, res) => {
  try {
    const deleted = await Menu.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Menu item not found" });
    res.status(200).json({ message: "Menu item deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
