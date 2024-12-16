const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Créer un post
router.post('/', async (req, res) => {
    const newPost = new Post({ content: req.body.content });
    try {
        const post = await newPost.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtenir tous les posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ajouter un commentaire
router.post('/:id/comment', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post non trouvé" });

    post.comments.push({ text: req.body.text });
    await post.save();
    res.status(201).json(post);
});

// Ajouter un like
router.post('/:id/like', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post non trouvé" });
    Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post non trouvé" });

    post.likes++;
    await post.save();
    res.status(200).json(post);
});

module.exports = router;
