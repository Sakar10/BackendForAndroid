const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Orders = require('../models/userMatch');
const auth=require('../models/auth');


// router.get('/',auth,(req,res,next) => {
//     Orders.find()
//     .populate('product')
//     .populate('customer')
//             .exec()
//             .then(docs =>{
//                 res.status(200).json(docs);
//             })
//             .catch(err => {
//                 res.status(500).json({
//                     error:err 
//                 });
//             });
// });

router.post('/',(req,res,next) => {
    var datetime = new Date();
    const orders = new Orders({
         id: new mongoose.Types.ObjectId(),
         userOne: req.body.userOne,
         userTwo:req.body.userTwo,
         destinationType:req.body.destinationType,
         date:datetime
    });
    orders.save().then(result => {
            console.log(result);
            res.status(201).json({
                status:'success',
                createdProduct: result
        });
    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
});

router.get('/:matchId', auth,(req,res,next) => {
       req.params.matchId;
       const id = req.params.matchId;
       Orders.find({_id:id}).exec()
       .then(doc => {
           if(doc) {
            res.status(200).json(doc);
           }else{
               res.status(404).json({
                   message: 'No matches found'
               });
           }
       }).catch(err => {
           res.status(500).json({error:err});
       });
});


router.patch('/:matchId', auth,(req,res,next) => {
    const id = req.params.matchId;
    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        updateOps[key]=req.body[key];
      }
    Orders.update({_id: id}, {$set: updateOps})
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


router.delete('/:matchId', auth,(req,res,next) => {
    const id = req.params.matchId;
    Orders.remove({_id: id})
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

module.exports = router;