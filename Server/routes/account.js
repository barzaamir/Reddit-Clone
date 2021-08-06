const express = require('express');
const crypto = require("crypto");
const mailjet = require('node-mailjet').connect('cd4ef70fcd1b7d6fc93bc48a4c9c40b6','c7e8191523ba38bf334defe3bb3f5d27');
const router = express.Router();
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
let jwt_secret = "MySecret";

router.post("/validateToken",(req,res)=>{
    jwt.verify(req.body.token,jwt_secret,(err,token)=>{
        if(!err)
            res.json({
                status:true,
                token:token
            })
        else
            res.json({
                status:false
            })
    });  
});

router.post('/auth',(req,res)=>{
    Users.find({email:req.body.email}).then((data)=>{
        if(data.length && data[0].isVerified==true){
            const sha256Hasher = crypto.createHmac("sha256", data[0].salt);
            const hash = sha256Hasher.update(req.body.password).digest("hex");
            if(data[0].password==hash){
                jwt.sign({uname:data[0].uname,email:data[0].email,userId:data[0]._id},jwt_secret,{},(err, token)=>{
                    if(err)
                        console.log(err);
                    else
                        res.json({
                            status:true,
                            token:token
                        })
                });
            }
            else
                res.json({
                    status:false
                })
        }
        else
            res.json({
                status:false
            })
    }).catch((err)=>{
        console.log(err);
    });
});

router.post('/saveUser',(req,res)=>{
    Users.find({email:req.body.email}).then((data)=>{
        if(data.length)
            res.json({
                status:false
            })
        else{
            const token=Date.now().toString(36)+Math.random().toString(36).substr(2);
            const salt=Date.now().toString(36)+Math.random().toString(36).substr(2);
            const sha256Hasher = crypto.createHmac("sha256", salt);
            const hash = sha256Hasher.update(req.body.password).digest("hex");
            const user = new Users({
                uname: req.body.uname,
                password: hash,
                email: req.body.email,
                salt: salt,
                key: token,
                isVerified: false,
                time: Date.now()
            })
            user.save().then(()=>{
                sendVerification(token,req.body.email,req.body.uname);
                res.json({
                    status:true
                })
            }).catch((err)=>{
                console.log(err);
            });
        }
    }).catch((err)=>{
        console.log(err);
    });
});

router.get("/verify",(req,res)=>{
    let token=req.query.key;
    Users.updateOne({key:token},{isVerified:true}).then(()=>{
        res.redirect("http://localhost:3000/login");
    }).catch((err)=>{
        console.log(err);
    });
});

function sendVerification(token,email,uname){
    const request = mailjet.post("send", {'version': 'v3.1'}).request({
        "Messages":[{
                "From":{
                    "Email": "barzaamir2531@gmail.com",
                    "Name": "Barza"
                },
                "To":[{
                    "Email": email,
                    "Name": uname
                    }
                    ],
                "Subject": "Verification Mail",
                "TextPart": "Verify your mail",
                "HTMLPart": "<h3>Dear "+uname+", Welcome to reddit.. Please <a href='http://localhost:8000/account/verify?key="+token+"'>verify your Email</a>!</h3><br />",
                "CustomID": "AppGettingStartedTest"
            }]
    })
    request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err.statusCode)
    })
}

module.exports=router;