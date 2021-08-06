import React,{useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import styles from "../style.module.css";

import Input from '../../components/input';
import Button from '../../components/button';
import Message from '../../components/message';
import Authenticate from '../../utils/authenticate';

function UseLogin(){

    const history=useHistory("");
    const[message,setMessage]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    
    function getEmail(event){
        setEmail(event.target.value);
    }
    function getPassword(event){
        setPassword(event.target.value);
    }

    function authentication(event){
        event.preventDefault();
        if(email && password){
            const data={
                email:email,
                password:password
            }
            Authenticate(data,function(res,token){
                if(res){
                    localStorage.setItem("auth",token);
                    history.push('/');
                }
                else
                    setMessage("invalid user");
            })
        }
        else
            setMessage("please fill out all the fields");
    }
    
    return{
        email,
        getEmail,
        password,
        getPassword,
        message,
        authentication
    }
}

export default function Login(){
    const{email,getEmail,password,getPassword,message,authentication}=UseLogin({});

    return(
        <>
            <form className={styles.form}>
                <h1>Login</h1><br/>
                <div>
                    <h5>Email</h5>
                    <Input value={email} onChange={getEmail} type="email" placeholder="Enter Email"/><br/><br/>
                    <h5>Password</h5>
                    <Input value={password} onChange={getPassword} type="password" placeholder="Enter Password"/><br/><br/>
                    <Message text={message} type="error"/><br/><br/>
                    <Button text="Login" onClick={authentication}/><br/><br/>
                    <p><Link to="/signup">Signup</Link> <Link to="/forgotpsw">Forgot password</Link></p>
                    
                </div>
            </form>
        </>
    )
}