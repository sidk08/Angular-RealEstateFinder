const express=require('express');
const router=express.Router();
const User=require('../models/user');
var jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');



// user registration 
router.post('/signup',(req,res,next)=>{
   
    let newUser=new User(
        {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:bcrypt.hashSync(req.body.password, 10),
            email:req.body.email,
            userType:req.body.userType
            
        }
    );



newUser.save((err,user)=>{

    if(err){
        console.log(err);
        res.json({msg:'Action failed!'});
       
    }

    else{
        res.json({msg:'User  added!'});
    }
 })

});


router.post('/signin',(req,res,next)=>{
     
    //const email=req.body.email;
    const password=req.body.password;
    //console.log('the username ' +req.body.email);
    
    User.findOne({email:req.body.email}, function(err, user) {

        
       
        if(err){
            console.log(err);
            res.json({msg:'Action failed!'});
           
        }
        if (!user) {
            return res.status(401).json({
                title: 'No user found',
                error: {message: 'User could not be found'}
            });
        }
        User.comparePassword(password,user.password, (err, isMatch)=>
        {
            if(err){
                console.log(err);
                res.json({msg:'passwords did not match!'});
               
            }
        

             if(isMatch){

              //  var payload = {id: user.id};
                //(user, opts.secretOrKey,{expiresIn: 7200});
                var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
                return res.status(200).json({
                    message: 'Successfully logged in',
                    token: token,
                    userId: user._id,
                    userType: user.userType,
                    email:req.body.email
                });
             }
             else{
               
                    console.log(err);
                    res.json({msg:'Action failed!'});
                   
                
             }
        }

    ) 
        
        /*var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });*/
    });

});  

module.exports = router;