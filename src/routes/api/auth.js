const express = require('express'), router = express.Router(),
  User = require('../../models/User')


// Allows a user to login based on entered username & password combination 
router.post('/login', function (req, res, next) {
  if (req.body.logusername && req.body.logpassword) {
    User.authenticate(req.body.logusername, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      } else {
        //logged in
        req.session.userId = user._id;
        return res.redirect('./home');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

// GET route after registering
router.get('/home', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('Authorized user. Successful login.');
        }
      }
    });
});

//Allows a user to register
router.post('/register', function (req, res, next) {
  //ensure all fields are provided to register new user
  if (req.body.username &&
    req.body.password) {
    var userData = {
      username: req.body.username,
      password: req.body.password,
    }
    
    
    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('./home');
      }
    });
  } // cannot create user because not all fields provided
  else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});


//Logs user out and returns to home
router.get('/logout', function (req, res, next) {
  //if session exist then destory it
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
        //else not logged in so return to login 
      } else {
        return res.redirect('/');
      }
    });
  }
});


module.exports = router; 