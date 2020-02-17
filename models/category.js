const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    category:{type:String,unique:true},
    _catImg:String
});
var Category=mongoose.model('category', categorySchema);
module.exports = Category;