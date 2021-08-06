import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/button';
import Message from '../components/message';
import styles from './style.module.css';
import SaveData from '../utils/saveData';
import GetData from '../utils/getData';
import DeleteData from '../utils/deleteData';
import DeleteIcon from '@material-ui/icons/Delete';
import TextArea from '../components/textarea';

function UseMakeReply(props){
    const history=useHistory("");
    if(!localStorage.getItem("commentId"))
        history.push('/')

    const[comment,setComment]=useState({});
    const[reply,setReply]=useState("");
    const[replies,setReplies]=useState([]);
    const[message,setMessage]=useState("");
    const[type,setType]=useState("");

    useEffect(()=>{
        let isMounted=true;
            GetData("comment/getComments",{_id:localStorage.getItem("postId")},function(data){
                if(isMounted){
                    data=data.comments;
                    data.forEach(function(element){
                        if(element._id===localStorage.getItem("commentId")){
                            setComment(element);
                        }
                    })
                }
            })
            GetData("reply/getReplies",{_id:localStorage.getItem("commentId")},function(data){
                if(isMounted)
                    setReplies(data.replies);
            })
            return()=>{isMounted=false}; 
    },[]);

    function getReplies(){
        GetData("reply/getReplies",{_id:localStorage.getItem("commentId")},function(data){
            setReplies(data.replies);
        })
    }

    function getReply(event){
        setReply(event.target.value)
    }

    function saveReply(){
        if(reply){
            const data={
                commentId:localStorage.getItem("commentId"),
                reply:reply,
                userId:props.userId,
                uname:props.uname,
                visibility:true
            }
            SaveData("reply/saveReplies",data,function(res){
                if(res){
                    setMessage("reply sent!");
                    setType("success");
                    setReply("");
                    getReplies();
                }
            })
        }
        else{
            setMessage("please provide reply");
            setType("error");
        }
    }

    function deleteComment(id){
        return function(){
            DeleteData("comment/delComments",{id:id},function(res){
                if(res){
                    history.goBack();
                }
            })
        }

    }

    function deleteReply(id){
        return function(){
            DeleteData("reply/delReplies",{id:id},function(res){
                if(res){
                    getReplies();
                }
            })
        }

    }

    return{
        deleteReply,
        comment,
        replies,
        reply,
        getReply,
        message,
        type,
        saveReply,
        deleteComment
    }
}

function NoReply(props){
    if(!props.length)
        return<p>No Reply to Show</p>
    else
        return<></>
}

function DeleteComment(props){
    if(props.user===props.userId){
        return <p style={{float:'right'}}>Delete< DeleteIcon onClick={props.del(props.id)} /></p>
    }
    else
        return<></>
}

function DeleteReply(props){
    if(props.user===props.userId){
        return <DeleteIcon onClick={props.del(props.id)} style={{float:'right'}}/>
    }
    else
        return<></>
}

export default function MakeReply(props){
    const{comment,replies,reply,getReply,message,type,saveReply,deleteReply,deleteComment}=UseMakeReply({userId:props.userId, uname:props.uname});
    
    return(
        <>
            <div className={styles.form}>
                <h4>Comment</h4><br/>
                <p style={{fontSize:"13px",wordWrap:" break-word"}}>Posted by: {comment.uname} @ {(comment.time)?(comment.time).toString().split('.')[0].replace('T',' '):""}</p>
                <h4 style={{wordWrap:" break-word"}}>{comment.comment}</h4>
                <hr/>
                <DeleteComment id={comment._id} userId={comment.userId} user={props.userId} del={deleteComment}/><br/>
            </div>
            <div className={styles.form}>
            <h4>Replies</h4><br/>
            <NoReply length={replies.length}/>{
                replies.map(function(reply,index){
                    return(
                        <div key={index}>
                            <p style={{fontSize:"13px",wordWrap:" break-word"}}>Posted by: {reply.uname} @ {(reply.time)?(reply.time).toString().split('.')[0].replace('T',' '):""}</p>
                            <label style={{wordWrap:" break-word"}}>{reply.reply}</label>
                            <DeleteReply id={reply._id} userId={reply.userId} user={props.userId} del={deleteReply}/>
                            <hr/>
                        </div>
                    )
                })
            }</div>
            <div className={styles.form}>
                <TextArea value={reply} onChange={getReply} placeholder="Reply"/>
                <Message text={message} type={type}/><br/><br/>
                <Button onClick={saveReply} text="Reply"/>
            </div>
        </>
    )
}