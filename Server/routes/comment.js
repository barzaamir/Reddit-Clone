const express = require('express');
const router = express.Router();
const Comments = require('../models/comments');
const Posts = require('../models/posts');
const Users = require('../models/users');

router.post('/getComments',(req,res)=>{
    if(req.body._id!=''){
        Posts.findOne(req.body).populate('comments').then((data)=>{
            if(data){
                let arr=[];
                (data.comments).forEach((comment)=>{
                    if(comment.visibility)
                        arr.push(comment);
                })
                res.json({
                    comments:arr
                })
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
});

router.post('/saveComments',(req,res)=>{
    let obj=req.body;
    obj.time=Date.now();
    const comment= new Comments(obj);
    comment.save().then((id)=>{
        Users.updateOne({_id:req.body.userId},{$push:{comments:id}}).then(()=>{
            Posts.updateOne({_id:req.body.postId},{$push:{comments:id}}).then(()=>{
                res.json({
                    status:true
                })
            }).catch((err)=>{
                console.log(err);
            });
        }).catch((err)=>{
            console.log(err);
        });
    }).catch((err)=>{
        console.log(err);
    });
});

router.post('/delComments',(req,res)=>{
    Comments.updateOne({_id:req.body.id},{visibility:false}).then(()=>{
        res.json({
            status:true
        })
    }).catch((err)=>{
        console.log(err);
    });
})

module.exports=router;