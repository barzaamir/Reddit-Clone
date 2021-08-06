import React from 'react';
import {Link} from "react-router-dom";
import styles from "./style.module.css";
import Button from "../button";

export default function Nav(props){

    function changeLogged(){
        localStorage.clear();
        window.location.replace('/');
    }

    let links=(props.logged)?[
        {
            to:"/",
            text:"Log Out",
            float:"right",
            onClick:changeLogged
        },{
            to:"/myposts",
            text:(props.uname).split(" ")[0]+"'s Posts",
            float:"right"
        },{
            to:"/changepsw",
            text:"Change Password",
            float:"right"
        },{
            to:'/',
            text:"Home",
            float:"left"
        }]:(!props.logged)?[
            {
                to:"/signup",
                text:"Sign Up",
                float:"right"
            },{
                to:"/login",
                text:"Log In",
                float:"right"
            },{
                to:"/",
                text:"Home",
                float:"left"
            }
        ]:[];

	return(
		<div className={styles.nav}>
            {
                links.map(function(link,index){
                        return <Link to={link.to} key={index} style={{float:link.float,margin:"15px 30px"}}><Button text={link.text} onClick={link.onClick} ></Button></Link>
                })
            }
		</div>
	)
}