// express router
const router = require('express').Router();
// mongo model
let User = require('../models/user');

// handle get request 
router.route('/').get((req, res) => {
  // get all the users and return a promise
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// handle post request
router.route('/add').post((req, res) => {
  // new username is part of requset body because post command put data in req
  const username = req.body.username;
  // create new user
  const newUser = new User({username});
  // save to database
  newUser.save()
    // return message or error
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;