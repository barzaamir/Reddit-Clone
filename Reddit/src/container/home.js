import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../components/button';
import Links from '../components/likeComment';
import Media from '../components/media';
import GetData from '../utils/getData';
import styles from './style.module.css';

function UseHome(){
    const history=useHistory("");
    const[posts,setPosts]=useState([]);

    useEffect(()=>{
        let isMounted=true;  
        GetData("post/getPosts",{},function(data){
            if(isMounted)
                setPosts(data.posts);
        })
        return()=>{isMounted=false}; 
    },[]);

    function accessComment(id){
        return function(){
            localStorage.setItem("postId",id);
            history.push('/makecomment');
        }
    }


    return{
        accessComment,
        posts
    }
}

function CreatePost(props){
    let link;
    if(props.logged)
        link='/createpost';
    else link='/login';
    return(
        <div className={styles.form}>
            <Link to={link}><Button type="large" text="Create A Post"/></Link>
        </div>
    )
}

function NoPost(props){
    if(!props.length){
        return<div className={styles.form} style={{textAlign:"center"}}><p>No Post to Show</p></div>
    }
    else
        return<></>
}

export default function Home(props){ 
    const{posts,accessComment}=UseHome({});
    return(
        <>
            <CreatePost logged={props.logged}/>
            <div>
                <NoPost length={posts.length}/>{
                posts.slice(0).reverse().map(function(post,index){
                    return(
                        <div className={styles.form} key={index}>
                            <div onClick={accessComment(post._id)}>
                                <p style={{fontSize:"13px",wordWrap:" break-word"}}>Posted by: {post.uname} @ {(post.time)?(post.time).toString().split('.')[0].replace('T',' '):""}</p>
                                <h4 style={{wordWrap:" break-word"}} >{post.title}</h4>
                                <hr/>
                                <Media url={post.url} text={post.text} img={post.img}/><br/>
                            </div>
                            <Links logged={props.logged} id={post._id} userId={props.userId} uname={props.uname}/>
                        </div>
                    )
                })
            }<br/></div>
        </>  
    )
}