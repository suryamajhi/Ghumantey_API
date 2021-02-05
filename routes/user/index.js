const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Destination = require("../../models/Destination");
const Package = require("../../models/Package");
const Agency = require("../../models/Agency");
const Book = require("../../models/Book");
const Includes = require("../../models/Includes");
const Itenary = require("../../models/Itenary");
const Excludes = require("../../models/Excludes");
const {isEmpty, uploadDir} = require('../../helpers/upload-helper');
const fs = require('fs');

//Profile
router.get("/profile",(req, res)=>{
    let user_id = req.session.passport.user;
    User.findOne({_id: user_id}).then(user=>{
        res.json(user);
    });
});

//Edit profile
router.put('/profile/edit',(req, res)=>{
   let userId = req.session.passport.user;
   User.findOne({_id: userId})
       .then(user =>{
            user.firstName =req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;

            let fileName = "default-profile.png";
            if(!isEmpty(req.files)){
                let file =req.files.file;
                fileName =Date.now() + '-' +file.name;
                user.image = fileName;

                file.mv('./public/uploads/' + fileName, (err)=>{
                    if(err) throw err;
                });
            }

            user.save().then(updatedUser =>{
                res.json(updatedUser);
            });
       });
});


//View all destinations
router.get("/destinations", (req, res)=>{

    Destination.find({}).then(destinations =>{
        var jsonData = JSON.stringify(destinations);
        jsonData = `{"data":${jsonData}}`;
        jsonData = JSON.parse(jsonData);
        console.log(jsonData);
        res.json(jsonData);
    });
});

router.get("/destinations/:id", (req, res)=>{
    Destination.findOne({_id: req.params.id}).then(destination =>{
        res.json(destination);
    });
});

//View all packages
router.get("/packages", (req, res)=>{
    Package.find({}).then(packages=>{
        res.json(packages);
    });
});

router.get("/package/:id", async (req, res)=>{
     await Package.findOne({_id: req.params.id}).then(package1=>{

         Itenary.find({package: package1._id}).then(itenaries=>{
            package1.itenaries = itenaries;

             Includes.find({package: package1._id}).then(includes=>{
                 package1.includes = includes;

                 Excludes.find({package: package1._id}).then(excludes=>{
                     package1.excludes = excludes;

                     res.json(package1);
                 });
             });
        });

    });
});

router.get('/destination/:id/packages',(req, res)=>{
    Package.find({destination : req.params.id}).then(packages=>{
        res.json(packages);
    });
});

//View One Agency
router.get('/agency/:id', (req, res)=>{
    Agency.findOne({_id: req.params.id}).then(agency=>{
        Package.find({agency: agency._id}).then(packages =>{
            agency.packages = packages;
            res.json(agency);
        });
    });
});

//Booking packages
router.get('/book/package/:id', (req, res)=>{
    Package.findOne({_id: req.params.id}).then(package1=>{
        res.json(package1);
    });
});

router.post('/book/package/:id', (req, res)=>{
    Package.findOne({_id: req.params.id}).then(package1=>{
        const newBook = new Book({
            package: package1._id,
            user: res.session.passport.user,
            traveller: req.body.traveller
        });
        newBook.save().then(savedBook => {
            res.json(savedBook);
        });
    });
});

//My Bookings
router.get("/myBookings",(req, res)=>{
   let userId = req.session.passport.user;
       Book.find({user: userId}).then(bookings=>{
           res.json(bookings);
       });
});




module.exports = router;