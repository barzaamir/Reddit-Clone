export default function GetImg(req,img,cb){
    var xhttp=new XMLHttpRequest();
    xhttp.addEventListener("load", function(res){
        cb(this.responseText);
    })
    xhttp.open("post", "http://localhost:8000/"+req);
    xhttp.setRequestHeader('Content-type','application/json');
    xhttp.send(JSON.stringify({img:img}));  
}