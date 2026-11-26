const validateItem = (req, res, next) => {
  const { name, category, quantity, price } = req.body;

  if (!name || !category || quantity === undefined || price === undefined) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Invalid item name"
    });
  }

  if (typeof category !== "string" || category.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Invalid category"
    });
  }

  if (!Number.isFinite(Number(quantity)) || Number(quantity) < 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid quantity"
    });
  }

  if (!Number.isFinite(Number(price)) || Number(price) < 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid price"
    });
  }

  next();
};

module.exports = validateItem;