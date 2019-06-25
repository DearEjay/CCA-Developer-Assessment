const express = require('express'), router = express.Router();
const Post = require('../../models/Post');

// Get all posts
router.get('/', async (req, res, next) => {
    try {
        res.status(200).json(await Post.find());
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// Get post by ID
router.get('/:postId', async (req, res, next) => {
    try {
        res.status(200).json(await Post.findById(req.params.postId));
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// Create a new post 
router.post('/', async (req, res, next) => {
    const post = new Post({
        postedBy: req.body.postedBy,
        text: req.body.text
    });

    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ message: err });
    }

});

// Delete post by ID
router.delete('/:postId', async (req, res, next) => {
    try {
        res.status(200).json(await Post.deleteOne({ _id: req.params.postId }));
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

module.exports = router; 