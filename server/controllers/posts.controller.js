const supabase = require("../services/supabase.service");

const getAllPosts = async (req, res) => {
  const { data, error } = await supabase.from("posts").select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

const getPostsWithTutorialInTitle = async (req, res) => {
  const { data, error } = await supabase
    .from("posts")
    .select()
    .ilike("title", "%tutorial%");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

module.exports = { getAllPosts, getPostsWithTutorialInTitle };

