import React,{useState} from 'react';

import styles from '../style.module.css';
import Input from '../../components/input';
import Message from '../../components/message';
import Button from '../../components/button';
import SaveData from '../../utils/saveData';

function UseChangePsw(props){

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

    function updatePsw(){ 
        if(psw1 && psw2){
            if(psw1!==psw2){
                setMessage("please enter same password");
                setType("error");
            }
            else{
                const data={
                    password:psw1,
                    email:props.email,
                    uname:props.uname
                }
                SaveData("password/changePsw",data,function(res){
                    if(res){
                        setMessage("password successfully changed");
                        setType("success");
                        setPsw1("");
                        setPsw2("");
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
        getPsw1,
        getPsw2,
        psw1,
        psw2,
        message,
        type,
        updatePsw
    }
}

export default function ChangePsw(props){
    
    const{getPsw1,getPsw2,psw1,psw2,message,type,updatePsw}=UseChangePsw({email:props.email,uname:props.uname});

    return(
        <>
            <div className={styles.form}>
                <h2>Change Password</h2><br/>
                <Input type="text" value={psw1} onChange={getPsw1} placeholder="New Password"/><br/><br/>
                <Input type="text" value={psw2} onChange={getPsw2} placeholder="Confirm Password"/><br/><br/>
                <Message text={message} type={type}/><br/><br/>
                <Button onClick={updatePsw} text="Submit"/>
            </div>
        </>
    )
}