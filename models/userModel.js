const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        require:[true,"User must have a username"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"User must have a password"]
    }
})

const USER=mongoose.model('USER',userSchema);

module.exports=USER;
