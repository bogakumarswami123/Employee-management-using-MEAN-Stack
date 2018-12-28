var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var  employeeSchema = new Schema({
    firstname:String,  
    lastname:String,
    empid: String,
    gender: String,
    mobile:String ,
    dob: String,
    address:String,
    city:String
   });



   module.exports = mongoose.model('Employee' , employeeSchema);