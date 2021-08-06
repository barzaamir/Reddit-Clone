const express = require('express');
const router = express.Router();
const Likes = require('../models/likes');
const Posts = require('../models/posts');
const Users = require('../models/users');

router.post('/getLikes',(req,res)=>{
    if(req.body._id!=''){
        Posts.findOne({_id:req.body._id}).populate('likes').then((data)=>{
            if(data){
                let count=0;
                let arr=[];
                (data.likes).forEach((like)=>{
                    if(like.visibility){
                        if(like.like)
                            count++;
                        if(like.userId==req.body.userId)
                            arr.push(like);
                    }
                })
                res.json({
                    likes:arr,
                    count:count
                })
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
})
router.post('/saveLikes',(req,res)=>{
    let obj=req.body;
    obj.time=Date.now();
    const like= new Likes(obj);
    like.save().then((id)=>{
        Users.updateOne({_id:req.body.userId},{$push:{likes:id}}).then(()=>{
            Posts.updateOne({_id:req.body.postId},{$push:{likes:id}}).then(()=>{
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

router.post('/updateLikes',(req,res)=>{
    Likes.updateOne({postId:req.body.postId,userId:req.body.userId},{like:req.body.like,dislike:req.body.dislike}).then(()=>{
        res.json({
            status:true
        })
    }).catch((err)=>{
        console.log(err);
    });
})

router.post('/delLikes',(req,res)=>{
    Likes.updateOne(req.body,{visibility:false}).then(()=>{
        res.json({
            status:true
        })
    }).catch((err)=>{
        console.log(err);
    });
})
module.exports=router;