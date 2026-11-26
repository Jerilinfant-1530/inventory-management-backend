const inventory = require("../model/inventoryData");

// GET ALL + FILTER + SEARCH
const getAllItems = (req, res) => {
  let items = [...inventory];

  // Category filter
  if (req.query.category) {
    items = items.filter(
      item =>
        item.category.toLowerCase() ===
        req.query.category.toLowerCase()
    );
  }

  // Search by name
  if (req.query.search) {
    items = items.filter(
      item =>
        item.name.toLowerCase().includes(
          req.query.search.toLowerCase()
        )
    );
  }

  // Minimum quantity filter
  if (req.query.minQuantity !== undefined) {
    items = items.filter(
      item => item.quantity >= Number(req.query.minQuantity)
    );
  }

  // Maximum quantity filter
  if (req.query.maxQuantity !== undefined) {
    items = items.filter(
      item => item.quantity <= Number(req.query.maxQuantity)
    );
  }

  res.status(200).json({
    success: true,
    count: items.length,
    data: items
  });
};

// GET SINGLE ITEM
const getItemById = (req, res, next) => {
  const id = Number(req.params.id);

  const item = inventory.find(item => item.id === id);

  if (!item) {
    const error = new Error("Item not found");
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: item
  });
};

// CREATE ITEM
const addItem = (req, res) => {
  const newItem = {
    id: inventory.length > 0
      ? Math.max(...inventory.map(item => item.id)) + 1
      : 1,
    name: req.body.name.trim(),
    category: req.body.category.trim(),
    quantity: Number(req.body.quantity),
    price: Number(req.body.price)
  };

  inventory.push(newItem);

  res.status(201).json({
    success: true,
    message: "Item added successfully",
    data: newItem
  });
};

// UPDATE ITEM
const updateItem = (req, res, next) => {
  const id = Number(req.params.id);

  const item = inventory.find(item => item.id === id);

  if (!item) {
    const error = new Error("Item not found");
    error.statusCode = 404;
    return next(error);
  }

  item.name = req.body.name.trim();
  item.category = req.body.category.trim();
  item.quantity = Number(req.body.quantity);
  item.price = Number(req.body.price);

  res.status(200).json({
    success: true,
    message: "Item updated successfully",
    data: item
  });
};

// DELETE ITEM
const deleteItem = (req, res, next) => {
  const id = Number(req.params.id);

  const index = inventory.findIndex(item => item.id === id);

  if (index === -1) {
    const error = new Error("Item not found");
    error.statusCode = 404;
    return next(error);
  }

  const deletedItem = inventory.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Item deleted successfully",
    data: deletedItem[0]
  });
};

module.exports = {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem
};