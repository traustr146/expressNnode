const express=require('express');
const router=express.Router();
const {checkSchema}=require('express-validator/check');


// router.get('/',function(req,res,next){
//     article.find({},function(err,articles){
//         if(err){
//             console.log(err);
//         }        
//         else{
//             res.render('index',{
//                 title:'articles page',
//                 thisarticles:articles
//             });
//         }
//     });
// });

// bringing in models

let article=require('../models/articlesSchema');


router.post('/addArticles',checkSchema({
    name:{
        isEmpty:{
            optional:'true',
            errorMessage:'name field must not be empty'
        }
    },
    author:{
        isEmpty:{
            optional:'true',
            errorMessage:'name field must not be empty'
        }
    },
    body:{
        isEmpty:{
            optional:'true',
            errorMessage:'name field must not be empty'
        }
    }
})
,function(req,res,next){
    console.log('inside /article/addArticles');
    let newarticle = new article();
    newarticle.name=req.body.name;
    newarticle.author=req.body.author;
    newarticle.body=req.body.description;
    newarticle.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            req.flash('success','article added');
            res.redirect('/'); 
        }
        
    });
});

router.get('/addArticles',function(req,res,next){
    res.render('addArticles',{
        title:'add article'
    });
});

router.post('/editArticle/:id',function(req,res,next){
    console.log('inside post method');
    let id=req.params.id;
    let newarticle = {};
    newarticle.name=req.body.name;
    newarticle.author=req.body.author;
    newarticle.body=req.body.description;
    query={_id:id};
    article.update(query,newarticle,function(err){
        if (err){
            console.log(err);
        }
        else{
            req.flash('success','article updated');
            console.log('success');
            res.redirect('/');
        }
    });
});

router.get('/:id',function(req,res){
    console.log('inside get method')
    console.log(req.params.id);
    article.findById(req.params.id,function(err,article){
        if (err){
            console.log(error);
        }
        else{
            res.render('article',{
                id:article._id,
                title:article.name,
                author:article.author,
                body:article.body,
            });
        }
    });
});

router.get('/edit/:id',function(req,res,next){
    console.log('/article/edit/:id');
     article.findById(req.params.id,function(err,articles){
         console.log(articles);
         if (err){
             console.log(err);
         }
         else{
             res.render('editArticle',{
                 title:'edit article',
                 thisarticle:articles
             });
         }
     });
 });

router.delete('/:id',function(req,res,next){
    let query={_id:req.params.id};
    article.remove(query,function(err){
        if (err){
            console.log(err);
        }
        else{
            res.send('success');
        }
    });
});

module.exports=router;