const express = require('express');
const Comments = require('../models/comments');
const Posts = require('../models/posts');
const router = express.Router();
const Replies = require('../models/replies');
const Users = require('../models/users');

router.post('/getReplies',(req,res)=>{
    if(req.body._id!=''){
        Comments.findOne(req.body).populate('replies').then((data)=>{
            if(data){
                let arr=[];
                (data.replies).forEach((reply)=>{
                    if(reply.visibility)
                        arr.push(reply);
                })
                res.json({
                    replies:arr
                })
            }
        }).catch((err)=>{
            console.log(err);
        });
    }   
});

router.post('/saveReplies',(req,res)=>{
    let obj=req.body;
    obj.time=Date.now();
    const reply= new Replies(obj);
    reply.save().then((id)=>{
        Users.updateOne({_id:req.body.userId},{$push:{replies:id}}).then(()=>{
            Posts.updateOne({_id:req.body.postId},{$push:{replies:id}}).then(()=>{
                Comments.updateOne({_id:req.body.commentId},{$push:{replies:id}}).then(()=>{
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
    }).catch((err)=>{
        console.log(err);
    });
});

router.post('/delReplies',(req,res)=>{
    Replies.updateOne({_id:req.body.id},{visibility:false}).then(()=>{
        res.json({
            status:true
        })
    }).catch((err)=>{
        console.log(err);
    });
})

module.exports=router;