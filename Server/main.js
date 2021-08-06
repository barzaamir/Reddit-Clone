const db=require('./models/init');
const express=require('express');
const app=express();
const cors=require("cors");
const router=require('./routes')
const path=require('path');
const port=8000;

app.use(express.json());
app.use(cors());
app.use(router);
app.use(express.static(path.join(__dirname,'public')));

db(function(err){
  if(!err){
    app.listen(port,()=>{
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
})