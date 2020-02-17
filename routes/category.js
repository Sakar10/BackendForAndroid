const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/category');
const auth=require('../models/auth');

router.get('/',(req,res,next) => {
    Category.find()
            .exec()
            .then(docs =>{
                const response={
                     count:docs.length,
                     category:docs
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
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        category: req.body.category,
        _catImg:req.body.catImg
    });
    category.save().then(result => {
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

router.get('/:cateId',(req,res,next) => {
         req.params.cateId;
       const id = req.params.cateId;
       Category.find({_id:id}).exec()
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


router.patch('/:cateId',(req,res,next) => {
    const id = req.params.cateId;
    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        updateOps[key]=req.body[key];
      }
    
    Category.update({_id: id}, {$set: updateOps})
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

router.delete('/:cateId',(req,res,next) => {
    const id = req.params.cateId;
    Category.deleteOne({_id: id})
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