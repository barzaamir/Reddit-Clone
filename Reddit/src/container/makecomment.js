import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/button';
import Message from '../components/message';
import TextArea from '../components/textarea';
import styles from './style.module.css';
import SaveData from '../utils/saveData';
import GetData from '../utils/getData';
import ReplyIcon from '@material-ui/icons/Reply';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteData from '../utils/deleteData';
import Media from '../components/media';

function UseMakeComment(props){
    const history=useHistory("");
    if(!localStorage.getItem("postId"))
        history.push('/')

    const[post,setPost]=useState({});
    const[comment,setComment]=useState("");
    const[comments,setComments]=useState([]);
    const[message,setMessage]=useState("");
    const[type,setType]=useState("");

    useEffect(()=>{
        let isMounted=true;
            GetData("post/getPosts",{},function(data){
                if(isMounted){
                    data=data.posts;
                    data.forEach(function(element){
                        if(element._id===localStorage.getItem("postId")){
                            setPost(element);
                        }
                    })
                }
            })
            GetData("comment/getComments",{_id:localStorage.getItem("postId")},function(data){
                if(isMounted)
                    setComments(data.comments);
            })
            return()=>{isMounted=false}; 
    },[]);

    function getComments(){
        GetData("comment/getComments",{_id:localStorage.getItem("postId")},function(data){
            setComments(data.comments);
        })
    }

    function getComment(event){
        setComment(event.target.value)
    }

    function saveComment(){
        if(comment){
            const data={
                postId:localStorage.getItem("postId"),
                comment:comment,
                userId:props.userId,
                uname:props.uname,
                visibility:true
            }
            SaveData("comment/saveComments",data,function(res){
                if(res){
                    setMessage("comment sent!");
                    setType("success");
                    setComment("");
                    getComments();
                }
            })
        }
        else{
            setMessage("please provide comment");
            setType("error");
        }
    }

    function deleteComment(id){
        return function(){
            DeleteData("comment/delComments",{id:id},function(res){
                if(res){
                    getComments();
                }
            })
        }

    }

    function deletePost(id){
        return function(){
            DeleteData("post/delPosts",{id:id},function(res){
                if(res){
                    history.goBack();
                }
            })
        }

    }

    function accessReplies(id){
        return function(){
            localStorage.setItem("commentId",id);
            history.push('/makereply');
        }
    }

    return{
        deleteComment,
        post,
        comments,
        comment,
        getComment,
        message,
        type,
        saveComment,
        accessReplies,
        deletePost
    }
}

function NoComment(props){
    if(!props.length)
        return<p>No Comment to Show</p>
    else
        return<></>
}

function DeleteComment(props){
    if(props.user===props.userId){
        return <DeleteIcon onClick={props.del(props.id)} style={{float:'right'}}/>
    }
    else
        return<></>
}

function DeletePost(props){
    if(props.user===props.userId){
        return <p style={{float:'right'}}>Delete< DeleteIcon onClick={props.del(props.id)} /></p>
    }
    else
        return<></>
}

export default function MakeComment(props){
    const{post,comments,comment,getComment,message,type,saveComment,accessReplies,deleteComment,deletePost}=UseMakeComment({userId:props.userId, uname:props.uname});
    
    return(
        <>
            <div className={styles.form}>
                <h4>Post</h4><br/>
                <p style={{fontSize:"13px",wordWrap:" break-word"}}>Posted by: {post.uname} @ {(post.time)?(post.time).toString().split('.')[0].replace('T',' '):""}</p>
                <h4 style={{wordWrap:" break-word"}}>{post.title}</h4>
                <hr/>
                <Media url={post.url} text={post.text} img={post.img}/>
                <DeletePost id={post._id} userId={post.userId} user={props.userId} del={deletePost}/><br/>
            </div>
            <div className={styles.form}>
            <h4>Comments</h4><br/>
            <NoComment length={comments.length}/>{
                comments.map(function(comment,index){
                    return(
                        <div key={index}>
                            <p style={{fontSize:"13px",wordWrap:" break-word"}}>Posted by: {comment.uname} @ {(comment.time)?(comment.time).toString().split('.')[0].replace('T',' '):""}</p>
                            <p style={{wordWrap:" break-word"}}>{comment.comment}</p>
                            <ReplyIcon onClick={accessReplies(comment._id)}/><label style={{fontSize:"14px"}}>Replies</label>
                            <DeleteComment id={comment._id} userId={comment.userId} user={props.userId} del={deleteComment}/>
                            <hr/>
                        </div>
                    )
                })
            }</div>
            <div className={styles.form}>
                <TextArea value={comment} onChange={getComment} placeholder="What are your thoughts?"/>
                <Message text={message} type={type}/><br/><br/>
                <Button onClick={saveComment} text="Comment"/>
            </div>
        </>
    )
}