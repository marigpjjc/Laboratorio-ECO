const supabase = require("../services/supabase.service");

const listAllProducts = async () => {
  const { data, error } = await supabase.from("products").select();
  if (error) return Promise.reject(error);
  return data;
};

const listProductsPriceLt50 = async () => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .lt("price", 50);
  if (error) return Promise.reject(error);
  return data;
};

const listProductsPriceGt30CategoryElectronics = async () => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .gt("price", 30)
    .eq("category", "Electronics");
  if (error) return Promise.reject(error);
  return data;
};

const listProductsPaginated = async (limit = 10, offset = 0) => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .range(offset, offset + limit - 1);
  if (error) return Promise.reject(error);
  return data;
};

const listProductsByUserId = async (userId) => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("user_id", userId);
  if (error) return Promise.reject(error);
  return data;
};

module.exports = {
  listAllProducts,
  listProductsPriceLt50,
  listProductsPriceGt30CategoryElectronics,
  listProductsPaginated,
  listProductsByUserId,
};



