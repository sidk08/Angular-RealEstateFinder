
const mongoose=require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');


const userSchema=mongoose.Schema({
     
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    userType:{
        type: String,
        required: true
         
    }

});

//generating methods to store password in encrypted formats
/*userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };

  userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };

  userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
    res.status(200).json({
        message: 'Successfully logged in',
        token: token,
        userId: user._id
    });

  };*/

  const User= module.exports=mongoose.model('User',userSchema);

 module.exports.getUserByEmail=function(email,callback){
      const query={email:email}
      User.findOne(query,callback);
    }



    module.exports.comparePassword=function(candidatePassword, hash, callback ){
        bcrypt.compare(candidatePassword,hash,(err, isMatch)=>{
            if(err) throw err;
            callback(null,isMatch);

        });

    }
    
    
    



