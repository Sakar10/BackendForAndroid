const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const SubCategory = require('../models/userCategory');
const auth=require('../models/auth');


router.post('/',(req,res,next) => {
    const subcategory = new SubCategory({
        _id: new mongoose.Types.ObjectId(),
        subcategory: req.body.subcategory,
        user:req.body.user
    });
    subcategory.save().then(result => {
            res.status(201).json({
                status:'success',
                created: result
        });
    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
});

router.post('/getusers', (req,res,next) => {
       const id = req.body.subcategory;
       SubCategory.find({subcategory:id}).populate("user").exec()
       .then(doc => {
           if(doc) {
            var result=[];
            doc.forEach(user => {
                var data={};
                data.firstname=user.user.firstname;
                data.lastname=user.user.lastname;
                data.address=user.user.address;
                data.image=user.user.profile;
                data.userId=user.user._id;
                result.push(data);
            });
            res.status(200).json(result);
           }else{
               res.status(404).json({
                   message: 'No users found'
               });
           }
       }).catch(err => {
           console.log(err);
           res.status(500).json({error:err});
       });
});


module.exports = router;