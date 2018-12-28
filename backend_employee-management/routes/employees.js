var express = require('express');
var router = express.Router();
var Employee = require('../model/employees');


// post method for inserting a employees in database
router.post("/", (req, res, next) => {
    Employee.findOne({ 'empid': req.body.empid }, (err, user) => {
        if (err) {
            return res.json({ message: err, class: 'danger' });
        }
        if (user) {
            return res.json({ message: 'employee Id is already in use.', class: 'danger' });
        }
        var myData = new Employee();
        myData.empid = req.body.empid;
        myData.firstname = req.body.firstname;
        myData.gender = req.body.gender;
        myData.lastname = req.body.lastname;
        myData.city = req.body.city;
        myData.dob = req.body.dob.toString();
        myData.address = req.body.address;
        myData.mobile = req.body.mobile;

        myData.save()
            .then(item => {
                Employee.find({}, (inner_err, data) => {
                    if (inner_err) {
                        res.json({ message: "No employee records found", error: inner_err })
                    }
                    else {
                        res.json({ data: data, message: "Employee successfully inserted", class: "success" });
                    }
                });

            })
            .catch(err => {
                res.status(400).json({ message: "error 404" });
            });
    });
});


// get method for getting all employees
router.get('/getemployees', (req, res, next) => {

    Employee.find({}, (err, data) => {
        if (err) {
            res.json({ msg: "No employee records found", error: err })
        }
        else {
            res.json({ data: data });
        }
    });

});

// get method for get employee by id for single employee
router.get('/employee/:id', function (req, res, next) {

    console.log(req.params.id);

    Employee.remove({ "_id": req.params.id }, function (err, data) {

        if (err) {
            res.json({ message: err });
        }

        if (res.status(200)) {
            Employee.find({}, function (inner_err, inner_data) {
                if (err) {
                    res.json({ msg: "No employee records found", error: inner_err })
                }
                else {
                    res.json({ data: inner_data });
                }
            });

        }
    });
});

// get method to update a employee record
router.get('/update/:id', (req, res, next) => {

    Employee.findById({ '_id': req.params.id }, (err, user) => {
        if (err) {
            return res.json({ message: err, class: 'danger' });
        }
        if (user) {
            return res.json({ user: user });
        }
    });
});


// post method for update a employee details
router.post('/update', (req, res, next) => {

    Employee.updateOne({ "_id": req.body._id }, { $set: req.body }, (err, result) => {
        if (err) { res.json({ message: err }) };
        if (res.status(200)) {
            Employee.find({}, (inner_err, data) => {
                if (inner_err) {
                    res.json({ message: "No employee records found", error: inner_err })
                }
                else {
                    res.json({ data: data, message: " updated successfully ", class: "success" });
                }
            });

        }
    });
});

// get method to view a employee details
router.get('/viewbyid/:id', (req, res, next) => {
    Employee.findById({ '_id': req.params.id }, (err, user) => {
        if (err) {
            return res.json({ message: err, class: 'danger' });
        }
        if (user) {
            return res.json({ user: user });
        }
    });
});


module.exports = router;

