const { listOrdersOrderedByCreatedAtDesc } = require("../db/orders.db");

const getOrdersOrderedDesc = async (req, res) => {
  try {
    const data = await listOrdersOrderedByCreatedAtDesc();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { getOrdersOrderedDesc };



