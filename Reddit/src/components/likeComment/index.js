import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import { Link, useHistory} from 'react-router-dom';
import DeleteData from '../../utils/deleteData';
import SaveData from '../../utils/saveData';
import { useEffect, useState } from 'react';
import GetData from '../../utils/getData';

function UseLinks(props){
    const[likes,setLikes]=useState([]);
    const[count,setCount]=useState(0);
    const history=useHistory("");

    useEffect(()=>{
        let isMounted=true;
        GetData("like/getLikes",{_id:props.id,userId:props.userId},function(data){
            if(isMounted){
                setLikes(data.likes);
                setCount(data.count);
            }
        })
        return()=>{isMounted=false}; 
    },[props.id,props.userId]);

    function getLikes(id,userId){
        GetData("like/getLikes",{_id:id,userId:userId},function(data){
            setLikes(data.likes);
            setCount(data.count);
        })
    }
    
    function saveLike(id,type){
        let data={
            postId:id,
            userId:props.userId,
            uname:props.uname,
            like:false,
            dislike:false,
            visibility:true
        };
        if(type==="like"){
            data.like=true;
            data.dislike=false;
        }
        else{
            data.like=false;
            data.dislike=true;
        }
        return function (){
            if((type==="like" && likes.find(ele=>ele.like))||(type==="dislike" && likes.find(ele=>ele.dislike))){
                DeleteData("like/delLikes",data,function(res){
                    if(res)
                        getLikes(id,props.userId);
                })
            }
            else if(likes.find(ele=>ele.postId===id)){
                SaveData("like/updateLikes",data,function(res){
                    if(res)
                        getLikes(id,props.userId);
                })
            }
            else{
                SaveData("like/saveLikes",data,function(res){
                    if(res)
                        getLikes(id,props.userId);
                })
            }
            getLikes();
        }
    }
    
    function accessComment(id){
        return function(){
            localStorage.setItem("postId",id);
            history.push('/makecomment');
        }
    }
    return{
        saveLike,
        accessComment,
        likes,
        count
    }
}

export default function Links(props){
    const{saveLike,accessComment,likes,count}=UseLinks({userId:props.userId,uname:props.uname,id:props.id});
    if(props.logged){
        return(
            <>
                <ThumbUp onClick={saveLike(props.id,"like")} style={{color:(likes.find(ele=>ele.like))?"green":""}}/>{" "}
                {count}
                <ThumbDown onClick={saveLike(props.id,"dislike")} style={{color:(likes.find(ele=>ele.dislike))?"red":""}}/>{" "}
                <CommentIcon onClick={accessComment(props.id)}/>
            </>
        )
    }
    else{
        return(
            <>
                <Link to='/login'><ThumbUp style={{color:"black"}}/></Link>{" "}
                {count}
                <Link to='/login'><ThumbDown  style={{color:"black"}}/></Link>{" "}
                <Link to='/login'><CommentIcon style={{color:"black"}}/></Link>
            </>
        )
    }
}