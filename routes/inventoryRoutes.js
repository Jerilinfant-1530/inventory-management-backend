const express = require("express");
const router = express.Router();

const {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem
} = require("../controllers/inventoryController");

const validateItem = require("../middleware/validation");

// GET all items + search + filter
router.get("/", getAllItems);

// GET single item
router.get("/:id", getItemById);

// POST new item
router.post("/", validateItem, addItem);

// PUT update item
router.put("/:id", validateItem, updateItem);

// DELETE item
router.delete("/:id", deleteItem);

module.exports = router;