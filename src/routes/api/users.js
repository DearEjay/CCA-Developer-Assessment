const express = require('express'), router = express.Router(),
    User = require('../../models/User');


// Get all users
router.get('/', async (req, res, next) => {
    try {
        res.status(200).json(await User.find());
    } catch (err) {
        res.status(400).json({ message: err });
    }
});


//Get a specific user by id
router.get('/:userId', async (req, res, next) => {
    try {
        res.status(200).json(await User.findById(req.params.userId));
    } catch (err) {
        res.status(400).json({message: err });
    }
});

//Create a new user
router.post('/', async (req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    try {
        await newUser.save();
        res.status(201).json({ message: "New user sucessfully created." });
    } catch (err) {
        res.status(400).json({ message: err });
    }

});

// Update a specific user by id
router.put('/:id', async function (req, res, next) {
    try {
        res.status(200).json(await User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
        }));
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});


// Delete a specific user by id
router.delete('/:userId', async (req, res, next) => {
    try {
        res.status(200).json(await User.deleteOne({ _id: req.params.userId }));
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

module.exports = router; 