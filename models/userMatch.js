const mongoose = require('mongoose');
const matchSchema = mongoose.Schema({
     userOne: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required:true
        },
     userTwo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required:true
        },
        destinationType:{
             type:Number,
             default:0
          },
        date:Date,
        status:{type:Number,
          default:0
}
});

var Order=mongoose.model('usermatch', matchSchema);;
module.exports = Order;