const {
  listAllProducts,
  listProductsPriceLt50,
  listProductsPriceGt30CategoryElectronics,
  listProductsPaginated,
  listProductsByUserId,
} = require("../db/products.db");

const getAllProducts = async (req, res) => {
  try {
    const data = await listAllProducts();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getProductsPriceLt50 = async (req, res) => {
  try {
    const data = await listProductsPriceLt50();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getProductsPriceGt30CategoryElectronics = async (req, res) => {
  try {
    const data = await listProductsPriceGt30CategoryElectronics();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getProductsPaginated = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const data = await listProductsPaginated(Number(limit), Number(offset));
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getProductsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await listProductsByUserId(user_id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductsPriceLt50,
  getProductsPriceGt30CategoryElectronics,
  getProductsPaginated,
  getProductsByUser,
};



