const express = require('express');
const mailjet=require('node-mailjet').connect('cd4ef70fcd1b7d6fc93bc48a4c9c40b6','c7e8191523ba38bf334defe3bb3f5d27');
const router = express.Router();
const Users = require('../models/users');
let token="";
let access=false;

router.post("/changePsw",(req,res)=>{
    Users.updateOne({email:req.body.email},{password:req.body.password}).then(()=>{
        if(req.body.uname)
            sendChangePsw(req.body.email,req.body.uname);
        res.json({
            status:true
        })
    }).catch((err)=>{
        console.log(err);
    });
})

router.post('/forgotPsw',(req,res)=>{
    Users.find({email:req.body.email}).then((data)=>{
        if(data.length){
            var token_=Date.now().toString(36)+Math.random().toString(36).substr(2);
            token=token_;
            access=false;
            sendResetPsw(data[0].email,data[0].uname,token);
            res.json({
                status:true
            })
        }
        else{
            res.json({
                status:false
            })
        }
    }).catch((err)=>{
        console.log(err);
    })
})

router.get('/setpsw',(req,res)=>{
    if(req.query.key===token){
        access=true;
        token="";
        res.redirect('http://localhost:3000/setpsw');
    }
    else{
        res.send("page not found")
    }
})

router.get('/validateAccess',(req,res)=>{
    if(access){
        res.json({
            status:true
        })
    }
    else
        res.json({
            status:false
        })
})

function sendChangePsw(email,uname){
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
                "Subject": "Password Changed",
                "TextPart": "You have changed your password",
                "HTMLPart": "<h3>Dear "+uname+", You have successfully changed your password!</h3><br />",
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

function sendResetPsw(email,uname,token){
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
                "Subject": "Password Reset",
                "TextPart": "Reset your password",
                "HTMLPart": "<h3>Dear "+uname+", Here is your password reset link.. Please <a href='http://localhost:8000/password/setpsw?key="+token+"'>click here</a>to reset!</h3><br />",
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