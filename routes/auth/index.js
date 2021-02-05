const express = require('express');
const router = express.Router();
const User =require('../../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// APP LOGIN

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{

    User.findOne({email: email}).then(user=>{

        if(!user) return done(null, false, {message: 'No user found'});

        bcrypt.compare(password, user.password, (err, matched)=>{

            if(err) return err;


            if(matched){
                return done(null, user);

            } else {

                return done(null, false, { message: 'Incorrect password' });

            }

        });

    });

}));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

router.get('/login',(req,res)=>{
    res.json({"message":"hello"});
})


//handling login
router.post('/login',(req, res)=>{

    passport.authenticate('local',{
        successRedirect:'/api/loginSuccess',
        failureRedirect: '/api/loginFail'
    })(req, res);
});

router.get('/loginSuccess',(req, res)=>{

    let user_id = req.session.passport.user;
    User.findOne({_id: user_id}).then(user=>{
        res.json({
            "success":"true",
            "message":"User login successfull",
            "data":user
        });
    });
});
router.get("/loginFail",(req,res)=>{
    res.json({
        "success":"false",
        "message":"User login failed",
    })
});



router.get('/logout',(req, res)=>{
    req.logOut();
    req.session.user = null;
    res.json({"message":"success", "description":"Logged Out Successfully"})
});


//User Registration

router.post('/register',(req, res)=>{

    User.findOne({email: req.body.email}).then(user=>{

        if(!user){

            const newUser =new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                image: "default-profile.jpg"
            });

            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    newUser.password = hash;

                    newUser.save().then(savedUser=>{
                        res.json({"status": "pass",
                                        "message":"Register Successful"});
                    });
                });
            });

        }
        else{
            res.json({"status":"fail", "message":"That email already exists"});
        }
    });

});

module.exports = router;
