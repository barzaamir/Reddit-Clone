import React, { useState } from 'react';

import styles from '../style.module.css';
import Button from '../../components/button';
import Input from '../../components/input';
import Message from '../../components/message';
import { useHistory } from 'react-router-dom';
import SaveData from '../../utils/saveData';

function Validate(){
    const history=useHistory("");
    var xhttp=new XMLHttpRequest();
    xhttp.addEventListener("load", function(res){
        let obj=JSON.parse(this.responseText);
        if(!obj.status){
            history.push('/forgotpsw');
        }
    })
    xhttp.open("get", "http://localhost:8000/password/validateAccess");
    xhttp.send();  
}

function UseSetPsw(){
    const history=useHistory("");
    if(!localStorage.getItem("email")){
        history.push('/forgotpsw');
    }
    Validate();
    const[psw1,setPsw1]=useState("");
    const[psw2,setPsw2]=useState("");
    const[message,setMessage]=useState("");
    const[type,setType]=useState("");

    function getPsw1(event){
        setPsw1(event.target.value);
    }

    function getPsw2(event){
        setPsw2(event.target.value);
    }

    function updatePsw(event){
        event.preventDefault();
        if(psw1 && psw2){
            if(psw1!==psw2){
                setMessage("please enter same password");
                setType("error");
            }
            else{
                const data={
                    password:psw1,
                    email:localStorage.getItem("email")
                }
                SaveData("password/changePsw",data,function(res){
                    if(res){
                        setMessage("password successfully changed");
                        setType("success");
                        setPsw1("");
                        setPsw2("");
                        localStorage.removeItem("email");
                        setTimeout(function(){
                            history.push('/login');
                        },1000)
                        
                    }
                })
            }
        }
        else{
            setMessage("please fill out all the fields");
            setType("error");
        }
    }

    return{
        psw1,
        psw2,
        getPsw1,
        getPsw2,
        message,
        type,
        updatePsw
    }
}

export default function SetPsw(props){
    const{psw1,psw2,getPsw1,getPsw2,message,type,updatePsw}=UseSetPsw({});

    return(
        <>
            <form className={styles.form}>
            <h2>Reset Password</h2><br/>
            <Input type="text" value={psw1} onChange={getPsw1} placeholder="New Password"/><br/><br/>
            <Input type="text" value={psw2} onChange={getPsw2} placeholder="Confirm Password"/><br/><br/>
            <Message text={message} type={type}/><br/><br/>
            <Button onClick={updatePsw} text="Submit"/>
            </form>  
        </>
    )
}