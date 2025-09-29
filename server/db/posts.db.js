const supabase = require("../services/supabase.service");

const listPostsWithTitleContainingTutorial = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select()
    .ilike("title", "%tutorial%");
  if (error) return Promise.reject(error);
  return data;
};

module.exports = { listPostsWithTitleContainingTutorial };



