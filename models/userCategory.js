const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersubcategorySchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
     user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required:true,
      index:true
    },
    subcategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory",
        required:true,
      index:true
      },
});
usersubcategorySchema.index({
  'user': 1,
  'subcategory': 1,
}, {
  unique: true,
});

var userSubCategory=mongoose.model('usercategory', usersubcategorySchema);
module.exports = userSubCategory;