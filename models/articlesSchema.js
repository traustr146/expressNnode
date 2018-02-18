let mongoose=require('mongoose');


let articleSchema=mongoose.Schema({
    article_id:String,
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('article',articleSchema);