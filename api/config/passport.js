var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt=require('passport-jwt').ExtractJwt;
var mongoose = require('mongoose');
var User = require('../models/user');
var config=require('../config/database');


module.exports=function(passport){

    let opts={};
    

  /*  opts.jwtFromRequest=ExtractJwt.fromAtuhHeaders;
    opts.secretOrKey="testing";
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    passport.use(new JwtStrategy(opts, (jwt_payload,done)=>{

        User.getUserById(jwt_payload._id,(err,user) =>{

            if(err){
                return done(err,false);
            }

            if(user){
                return done(null,user);
            }

            else{
                return done(null,false);
            }
        }
    
    
    );


    }));*/

 //   var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaders();
opts.secretOrKey = "testing";
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    });
}));

}
