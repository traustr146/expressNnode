const mongoose=require('mongoose');

let userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    password2:{
        type:String,
        required:true
    }
});

let user=module.exports=mongoose.model('user',userSchema);