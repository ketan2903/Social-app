const router = require("express").Router();
const Post = require("../models/Post");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// CREATE POST WITH IMAGE
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { text } = req.body;

    if (!text && !req.file) {
      return res.status(400).json({ message: "Post cannot be empty" });
    }

    const post = new Post({
      userId: req.user.id,
      username: req.user.username,
      text,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      likes: [],
      comments: [],
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LIKE / UNLIKE POST
router.put("/:id/like", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const username = req.user.username;

    if (post.likes.includes(username)) {
      post.likes.pull(username);
    } else {
      post.likes.push(username);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// COMMENT ON POST
router.post("/:id/comment", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({
      username: req.user.username,
      text: req.body.text,
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
