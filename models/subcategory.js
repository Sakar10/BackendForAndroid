const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subcategorySchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    subcategory:String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required:true
      },
});

var SubCategory=mongoose.model('subcategory', subcategorySchema);
module.exports = SubCategory;