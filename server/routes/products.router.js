const express = require("express");
const {
  getAllProducts,
  getProductsPriceLt50,
  getProductsPriceGt30CategoryElectronics,
  getProductsPaginated,
  getProductsByUser,
} = require("../controllers/products.controller");

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/price-lt-50", getProductsPriceLt50);
router.get(
  "/products/price-gt-30-category-electronics",
  getProductsPriceGt30CategoryElectronics
);
router.get("/products/paginated", getProductsPaginated);
router.get("/users/:user_id/products", getProductsByUser);

module.exports = router;



