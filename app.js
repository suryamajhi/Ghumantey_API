const express = require("express");
const app = express();
const mongoose =require("mongoose");
const session = require("express-session");
const upload = require('express-fileupload');
const bodyParser = require("body-parser");
const {mongoDbUrl} = require('./config/database');
const passport = require('passport');
const path = require('path');

//Connecting database

mongoose.connect(mongoDbUrl, {useNewUrlParser : true, useUnifiedTopology: true}).then(db=>{
    console.log('MONGO Connected');
}).catch(error=>console.log(error));

//Using Static

app.use(express.static(path.join(__dirname, 'public')));



//Body Parser

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Upload Middleware
app.use(upload());



//Local variable using middleware
app.use((req, res, next)=>{
    res.locals.user = req.user || null;
    next();
});




//Method override
app.use(session({
    secret:'surya_is_cool',
    resave: false,
    saveUninitialized: false
}));
//Passport
app.use(passport.initialize());
app.use(passport.session());



//Load Routes
const auth =require('./routes/auth/index');
const user = require('./routes/user/index');


//Use Routes
app.use('/api', auth);
app.use('/api', user);


//Listening to the port
app.listen(8000,()=>{
    console.log('listening on port 8000');
});


