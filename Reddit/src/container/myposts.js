import React, { useEffect, useState } from 'react';
import {useHistory } from 'react-router-dom';
import GetData from '../utils/getData';
import styles from './style.module.css';
import Links from '../components/likeComment';
import Media from '../components/media';
    
function UseMyPosts(props){
    const history=useHistory("");

    const[posts,setPosts]=useState([]);
    useEffect(()=>{
        let isMounted=true;
        GetData("post/getPosts",{_id:props.userId},function(data){
            if(isMounted)
                setPosts(data.posts);
        })
        return()=>{isMounted=false}; 
    },[props.userId]);

    function accessComment(id){
        return function(){
            localStorage.setItem("postId",id);
            history.push('/makecomment');
        }
    }

    return{
        posts,
        accessComment
    }
}

function NoPost(props){
    if(!props.length){
        return<div className={styles.form} style={{textAlign:"center"}}><p>No Post to Show</p></div>
    }
    else
        return<></>
}

export default function MyPosts(props){
    const{posts,accessComment}=UseMyPosts({userId:props.userId,uname:props.uname});

    return(
        <>
            <div>
            <NoPost length={posts.length}/>{
                posts.slice(0).reverse().map(function(post,index){
                    return(
                        <div className={styles.form} key={index}>
                            <div onClick={accessComment(post._id)}>
                                <p style={{fontSize:"13px",wordWrap:" break-word"}}>Posted by: {post.uname} @ {(post.time)?(post.time).toString().split('.')[0].replace('T',' '):""}</p>
                                <h4 style={{wordWrap:" break-word"}}>{post.title}</h4>
                                <hr/>
                                <Media url={post.url} text={post.text} img={post.img}/><br/>
                            </div>
                            <Links logged={true} id={post._id} userId={props.userId} uname={props.uname}/>
                        </div>
                    )
                })
            }
            </div>
            <br/>
        </>
    )
}