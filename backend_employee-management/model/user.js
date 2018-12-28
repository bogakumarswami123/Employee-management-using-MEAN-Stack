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

userSchema.methods.encryptPassword = function(password){
        return bcrypt.hashSync(password , bcrypt.genSaltSync(5), null);

}; 

// userSchema.methods.validPassword = function(password) {
//         var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
//         return this.hash === hash;
//       };

userSchema.methods.validPassword = function(password){
        return bcrypt.compareSync(password, this.password);

};     


 



module.exports = mongoose.model('User' , userSchema);