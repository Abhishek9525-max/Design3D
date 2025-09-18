const express = require("express");
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const { product, products } = require("../controller/product");

// GET all products
router.get("/", products);

// GET single product by ID
router.get("/:id",protect, product);

module.exports = router;
