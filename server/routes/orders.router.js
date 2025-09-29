const express = require("express");
const { getOrdersOrderedDesc } = require("../controllers/orders.controller");
const router = express.Router();

router.get("/orders", getOrdersOrderedDesc);

module.exports = router;



