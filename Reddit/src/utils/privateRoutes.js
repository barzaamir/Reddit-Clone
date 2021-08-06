import React, { useState } from "react";
import {Route} from "react-router-dom";
import ValidateToken from "./validateToken";

export default function PrivateRoute(props){
    const[userId,setUserId]=useState("");
    const[uname,setUname]=useState("");
    const[logged,setLogged]=useState("");
	const[email,setEmail]=useState("");

	ValidateToken(function(data,token){
        if(data){
            setLogged(true);
            setUserId(token.userId);
            setUname(token.uname);
			setEmail(token.email);
            props.cb({userId,uname,email,logged});
        }
		else{
			setLogged(false);
            props.cb({logged})
        }
    })
    if(props.check==="home"){
        return(
            <Route path={props.path} >{
                (logged || logged===false)?props.children:""
            }
            </Route>
        )
    }
    else
        return(
            <Route path={props.path} >{
                props.children
            }
            </Route>
        )
}