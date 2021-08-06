const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');
const multer=require('multer');
const Users = require('../models/users');
const path=require('path');
const { ObjectId } = require('bson');

let storage=multer.diskStorage({
    destination:function (req, file, cb){
      cb(null,'img/')
    },
    filename:function (req, file, cb){
      cb(null,file.fieldname+'-'+Date.now());
    }
  });
  
let upload=multer({ storage: storage });

router.post('/getPosts',(req,res)=>{
    if(!(Object.keys(req.body).length)){
        Posts.find({}).then((data)=>{
            let arr=[];
            data.forEach((post)=>{
                if(post.visibility)
                    arr.push(post);
            })
            res.json({
                posts:arr
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
    else if(req.body._id!=''){
        Users.findOne(req.body).populate('posts').then((data)=>{
            if(data){
                let arr=[];
                (data.posts).forEach((post)=>{
                    if(post.visibility)
                        arr.push(post);
                })
                res.json({
                    posts:arr
                })
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
});

router.get('/getImg',(req,res)=>{
    let img=req.query.key;
    let path_=path.join(__dirname,'../img/'+img);
    res.sendFile(path_);
})

router.post('/savePosts',(req,res)=>{
    let obj=req.body;
    obj.time=Date.now();
    const post= new Posts(obj);
    post.save().then((id)=>{
        Users.updateOne({_id:req.body.userId},{$push:{posts:id}}).then(()=>{
            res.json({
                status:true
            })
        }).catch((err)=>{
            console.log(err);
        });
    }).catch((err)=>{
        console.log(err);
    });
});

router.post('/saveImg',upload.single("img"),(req,res)=>{
    let obj=JSON.parse(req.body.text);
    obj.img=req.file.filename;
    obj.time=Date.now();
    const post= new Posts(obj);
    post.save().then((id)=>{
        Users.updateOne({_id:obj.userId},{$push:{posts:id}}).then(()=>{
            res.json({
                status:true
            })
        }).catch((err)=>{
            console.log(err);
        });
    }).catch((err)=>{
        console.log(err);
    });
});

router.post('/delPosts',(req,res)=>{
    Posts.updateOne({_id:req.body.id},{visibility:false}).then(()=>{
        res.json({
            status:true
        })
    }).catch((err)=>{
        console.log(err);
    });
})

module.exports=router;