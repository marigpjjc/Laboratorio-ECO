const express = require("express");
const { getAllPosts, getPostsWithTutorialInTitle } = require("../controllers/posts.controller");
const router = express.Router();

router.get("/posts", getAllPosts);

router.get("/posts/search/tutorial", getPostsWithTutorialInTitle);

module.exports = router;

