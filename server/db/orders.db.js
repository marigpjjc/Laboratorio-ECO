const supabase = require("../services/supabase.service");

const listOrdersOrderedByCreatedAtDesc = async () => {
  const { data, error } = await supabase
    .from("orders")
    .select()
    .order("created_at", { ascending: false });
  if (error) return Promise.reject(error);
  return data;
};

module.exports = { listOrdersOrderedByCreatedAtDesc };



