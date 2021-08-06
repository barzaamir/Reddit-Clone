import React,{useState} from 'react';
import {Link} from "react-router-dom";
import styles from '../style.module.css';

import Input from '../../components/input';
import Button from '../../components/button';
import Message from '../../components/message';
import SaveData from '../../utils/saveData';

function UseSignup(){

    const[message,setMessage]=useState("");
    const[type,setType]=useState("");
    const[uname,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    function getName(event){
        setName(event.target.value);
    }
    function getEmail(event){
        setEmail(event.target.value);
    }
    function getPassword(event){
        setPassword(event.target.value);
    }
    
    function saveUser(event){
        event.preventDefault();
        if(email && uname && password){
            const data={
                uname:uname,
                password:password,
                email:email
            }
            SaveData("account/saveUser",data,function(res){
                if(res){
                    setMessage("please check your email to verify account");
                    setName("");
                    setPassword("");
                    setEmail("");
                    setType("success");
                }
                else{
                    setMessage("user already exist");
                    setType("error");
                }
            })
        }
        else{
            setMessage("please fill out all the fields");
            setType("error");
        }
    }

    return{
        uname,
        getName,
        email,
        getEmail,
        password,
        getPassword,
        message,
        type,
        saveUser
    }
}

export default function Signup(props){
    const{uname,getName,email,getEmail,password,getPassword,message,type,saveUser}=UseSignup({});

    return(
        <>
            <form className={styles.form}>
                <h1>Signup</h1><br/>
                <div>
                    <h5>Name</h5>
                    <Input value={uname} onChange={getName} type="text" placeholder="Enter Name"/><br/><br/>
                    <h5>Email</h5>
                    <Input value={email} onChange={getEmail} type="email" placeholder="Enter Email"/><br/><br/>
                    <h5>Password</h5>
                    <Input value={password} onChange={getPassword} type="password" placeholder="Enter Password"/><br/><br/>
                    <Message text={message} type={type}/><br/><br/>
                    <Button text="Signup" onClick={saveUser}/><br/><br/>
                    <Link to="/login">login</Link>
                </div>
            </form>
        </>
    )
}