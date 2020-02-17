const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const SubCategory = require('../models/subcategory');
const auth=require('../models/auth');


router.get('/',(req,res,next) => {
    SubCategory.find()
    .populate('category')
            .exec()
            .then(docs =>{
                const response={
                     count:docs.length,
                     subcategory:docs
                };
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error:err 
                });
            });
});


router.post('/',(req,res,next) => {
    const subcategory = new SubCategory({
        _id: new mongoose.Types.ObjectId(),
        subcategory: req.body.subcategory,
        category:req.body.category
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

router.post('/getSubCategory', (req,res,next) => {
         req.params.cateId;
       const id = req.body.category;
       SubCategory.find({category:id}).exec()
       .then(doc => {
           if(doc) {
            res.status(200).json(doc);
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


router.patch('/:cateId', (req,res,next) => {
    const id = req.params.cateId;
    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        updateOps[key]=req.body[key];
      }
    
    SubCategory.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:cateId', (req,res,next) => {
    const id = req.params.cateId;
    SubCategory.deleteOne({_id: id})
        .exec()
        .then(result => {
                res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;