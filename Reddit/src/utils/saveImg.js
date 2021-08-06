export default function SaveImg(req,data,cb){ 

    var xhttp=new XMLHttpRequest();
    xhttp.addEventListener("load", function(res){
        let obj=JSON.parse(this.responseText);
        if(obj.status)
            cb(true)
        else
            cb(false)
    });
    xhttp.open("post", "http://localhost:8000/"+req);
    xhttp.send(data);

}