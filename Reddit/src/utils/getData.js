export default function GetData(req,data,cb){
    var xhttp=new XMLHttpRequest();
    xhttp.addEventListener("load", function(res){
        let obj=JSON.parse(this.responseText);
        cb(obj);
    })
    xhttp.open("post", "http://localhost:8000/"+req);
    xhttp.setRequestHeader('Content-type','application/json');
    xhttp.send(JSON.stringify(data));  

}