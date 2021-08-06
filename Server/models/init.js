const mongoose=require('mongoose');
const uri="mongodb+srv://root:root@cluster0.5njs6.mongodb.net/Reddit?retryWrites=true&w=majority";

function init(cb){
    mongoose.connect(uri,
    {
        useNewUrlParser:true, 
        useUnifiedTopology:true
    });

    const db=mongoose.connection;
    db.on('error',function(err){
        cb(err)
        console.log("error");
    });
    db.once('open',function(){
        cb(null)
        console.log("db connected");
    });
}

module.exports=init;
