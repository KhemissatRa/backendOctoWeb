const {pOrdee,dltOrder,Uporder,gtOrder} = require("../controller/order_controller");
const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth_middleware");
// Create product
router.post("/order",pOrdee);

// Get all products
router.get("/order",Auth,gtOrder);


// Update product by ID
router.put("/order/:id",Auth,Uporder);

// Delete product by ID
router.delete("/order/:id",Auth,dltOrder);

module.exports = router;
