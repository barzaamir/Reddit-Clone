export default function ForgotPass(data, cb){

    var xhttp=new XMLHttpRequest();
    xhttp.addEventListener("load", function(res){
        let obj=JSON.parse(this.responseText);
        if(obj.status)
            cb(true,obj.token);
        else
            cb(false);
    })
    xhttp.open("post", "http://localhost:8000/password/forgotPsw");
    xhttp.setRequestHeader('Content-type','application/json');
    xhttp.send(JSON.stringify(data));

}
