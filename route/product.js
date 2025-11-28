const { DltProduct, UpProduct, getProduct, GtProductId, CrProduct } = require("../controller/product_controller");
const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth_middleware");
const upload = require("../config/multer");

// Create product
router.post("/product", Auth, upload.single("Image"), CrProduct);

// Get all products
router.get("/product",getProduct);

// Get product by ID
router.get("/product/:id", GtProductId);

// Update product by ID
router.put("/product/:id", Auth, upload.single("Image"), UpProduct);

// Delete product by ID
router.delete("/product/:id",Auth,DltProduct);

module.exports = router;