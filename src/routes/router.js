const express = require('express'),  router = express.Router();

router.use('/posts', require('./api/posts')); 
router.use('/users', require('./api/users'));
router.use('/', require('./api/auth'));

module.exports = router;