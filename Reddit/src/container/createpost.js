import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Input from '../components/input';
import styles from './style.module.css';
import TextArea from '../components/textarea';
import Button from '../components/button';
import Message from '../components/message';
import SaveData from '../utils/saveData';
import SaveImg from '../utils/saveImg';

function UseCreatePost(props){

    const[title1,setTitle1]=useState("");
    const[title2,setTitle2]=useState("");
    const[title3,setTitle3]=useState("");
    const[text,setText]=useState("");
    const[url,setUrl]=useState("");
    const[img,setImg]=useState("");
    const[message1,setMessage1]=useState("");
    const[message2,setMessage2]=useState("");
    const[message3,setMessage3]=useState("");

    function getTitle1(event){
        setTitle1(event.target.value);
    }
    function getTitle2(event){
        setTitle2(event.target.value);
    }
    function getTitle3(event){
        setTitle3(event.target.value);
    }
    function getText(event){
        setText(event.target.value);
    }
    function getUrl(event){
        setUrl(event.target.value);
    }
    function getImage(event){
        setImg(event.target.files[0]);
    }

    function savePost(){
        if(title1){
            const data={
                uname:props.uname,
                userId:props.userId,
                title:title1,
                text:text,
                visibility:true
            }
            SaveData("post/savePosts",data,function(res){
                if(res)
                    window.location.replace('/');
            })
        }
        else
            setMessage1("please provide title");
    }

    function saveImage(){
        if(title2){
            const data={
                uname:props.uname,
                userId:props.userId,
                title:title2,
                visibility:true
            }
            var formData=new FormData();
            formData.append('text',JSON.stringify(data));
            formData.append('img',img);
            SaveImg("post/saveImg",formData,function(res){
                if(res)
                    window.location.replace('/');
            })
        }
        else
            setMessage2("please provide title");
    }

    function saveLink(){
        if(title3){
            const data={
                uname:props.uname,
                userId:props.userId,
                title:title3,
                url:url,
                visibility:true
            }
            SaveData("post/savePosts",data,function(res){
                if(res)
                    window.location.replace('/')
            })
        }
        else
            setMessage3("please provide title");
    }

    return{
        title1,
        getTitle1,
        text,
        getText,
        message1,
        savePost,
        title2,
        getTitle2,
        getImage,
        message2,
        saveImage,
        title3,
        getTitle3,
        url,
        getUrl,
        message3,
        saveLink
    }
}
  
export default function CreatePost(props){
    const{title1,getTitle1,text,getText,message1,savePost,title2,getTitle2,getImage,message2,saveImage,title3,getTitle3,url,getUrl,message3,saveLink}=UseCreatePost({userId:props.userId, uname:props.uname});

    return(
        <>
        <div className={styles.form}>
            <h2>Create a Post</h2><br/>
            <Tabs defaultActiveKey="first">
                <Tab eventKey="first" title="Post" >
                    <br/>
                    <div>
                        <Input type="text" placeholder="Title" value={title1} onChange={getTitle1}/><br/><br/>
                        <TextArea placeholder="Text(Optional)" value={text} onChange={getText}/><br/><br/>
                        <Message text={message1} type="error"/><br/><br/>
                        <Button onClick={savePost} text="Post"/>
                    </div>
                </Tab>
                <Tab eventKey="second" title="Image">
                    <br/>
                    <div>
                        <Input type="text" placeholder="Title" value={title2} onChange={getTitle2}/><br/><br/>
                        <h5>Select Image to Upload</h5><br/>
                        <Input type="file" onChange={getImage} /><br/><br/>
                        <Message text={message2} type="error"/><br/><br/>
                        <Button onClick={saveImage} text="Post"/>
                    </div>
                </Tab>
                <Tab eventKey="third" title="Link">
                    <br/>
                    <div>
                        <Input type="text" placeholder="Title" value={title3} onChange={getTitle3}/><br/><br/>
                        <Input type="url" placeholder="Url" value={url} onChange={getUrl}/><br/><br/>
                        <Message text={message3} type="error"/><br/><br/>
                        <Button onClick={saveLink} text="Post"/>
                    </div>
                </Tab>
            </Tabs>
        </div>
        </>
  );
}