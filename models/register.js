const mongoose=require('mongoose');
// const jwt=require('jsonwebtoken');
const Register= new mongoose.Schema(
{
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true
    },
    phone:{
        type:Number,
        required: true
    },
    address:{
        type:String,
        required: true
    }
});

// module.exports=mongoose.model('register',Register);
module.exports=mongoose.model('users',Register);