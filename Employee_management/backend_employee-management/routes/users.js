var express = require('express');
var router = express.Router();
var Model = require('../model/user');
var mongoose = require('mongoose');
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/register", (req, res, next) => {
   User.findOne({ 'email': req.body.email }, function (err, user) {
    if (err) {
      res.json({ message: err, class: 'danger' });
    }
    if (user) {
      return res.json({ message: 'Email is already in use.', class: 'danger' });
    }
    var myData = new User();
    myData.firstname = req.body.firstname;
    myData.gender = req.body.gender;
    myData.lastname = req.body.lastname;
    myData.email = req.body.email;
    myData.dob = req.body.dob.toString();
    myData.address = req.body.address;
    myData.company = req.body.company;
    // storing a password  in database in encrypted format
    myData.password = myData.encryptPassword(req.body.password); 

    myData.save()
      .then(item => {
        res.json({ message: true, class: "success" });
      })
      .catch(err => {
        res.status(400).json({ message: "error 404" });
      });
  });
});

router.post("/login", (req, res, next) => {
     User.findOne({ 'email': req.body.email }, function (err, user) {
    if (err) {
      res.json({ message: err, class: "danger"  , status : false});
    }
    if (!user) {
      return res.json({ message: 'No User Found', class: "danger" , status: false });
    }
    // validating a login valid password
    if (!user.validPassword(req.body.password)) {
      return res.json({ message: 'Incorrect Password . try Again', class: "danger" , status: false });
    }
    console.log(user);

    return res.json({ message: "user successfully login", class: "success" , status:true , user: user });

  });
});





module.exports = router;
