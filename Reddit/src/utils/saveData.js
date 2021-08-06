export default function SaveData(req,data,cb){ 

    var xhttp=new XMLHttpRequest();
    xhttp.addEventListener("load", function(res){
        let obj=JSON.parse(this.responseText);
        if(obj.status)
            cb(true)
        else
            cb(false)
    });
    xhttp.open("post", "http://localhost:8000/"+req);
    xhttp.setRequestHeader('Content-type','application/json');
    xhttp.send(JSON.stringify(data));

}