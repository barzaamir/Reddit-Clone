import React, { useState } from 'react';

import styles from '../style.module.css';
import Button from '../../components/button';
import Input from '../../components/input';
import Message from '../../components/message';
import ForgotPass from '../../utils/forgotPass';
function UseForgotPsw(){
    
    const[email,setEmail]=useState("");
    const[message,setMessage]=useState("");
    const[type,setType]=useState("");

    function getEmail(event){
        setEmail(event.target.value);
    }

    function validateEmail(event){
        event.preventDefault();
        if(email){
            const data={
                email:email
            }
            ForgotPass(data,function(res,token){
                if(res){
                    setMessage("link is sent!");
                    setType("success");
                    localStorage.setItem("email",email);
                }
                else{
                    setMessage("email not registered!");
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
        email,
        getEmail,
        message,
        type,
        validateEmail
    }
}


export default function ForgotPsw(){
    const{email,getEmail,message,type,validateEmail}=UseForgotPsw({});

    return(
        <>
            <form className={styles.form}>
                <h2>Enter your registered email</h2><br/>
                <Input type="email" value={email} onChange={getEmail} placeholder="Enter Email"/><br/><br/>
                <Message text={message} type={type}/><br/><br/>
                <Button onClick={validateEmail} type="large" text="Send Login Link"/>
            </form>
        </>
    )
}