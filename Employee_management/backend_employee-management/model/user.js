var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');



var  userSchema = new Schema({
        firstname:String,  
        lastname:String,
        email: String,
        gender: String,
        password:String ,
        dob: String,
        address:String,
        company:String
       });

var  employeeSchema = new Schema({
        empfirstname:String,  
        emplastname:String,
        empid: String,
        empgender: String,
        empmobile:String ,
        empdob: String,
        empaddress:String,
        empcity:String
       });

userSchema.methods.encryptPassword = function(password){
        return bcrypt.hashSync(password , bcrypt.genSaltSync(5), null);

}; 


userSchema.methods.validPassword = function(password){
        return bcrypt.compareSync(password, this.password);

}; 

var User = mongoose.model('User' , userSchema ,  'user');

var Employee = mongoose.model('Employee' , employeeSchema ,  'user');

module.exports = {
        User: User,
        Employee : Employee
}
       


 



