import {Redirect, Route, Switch} from "react-router-dom";

import ChangePsw from "../container/account/changepsw"
import Home from "../container/home";
import Login from "../container/account/login";
import Signup from "../container/account/signup";
import ForgotPsw from "../container/account/forgotpsw";
import SetPsw from "../container/account/setpsw";
import CreatePost from "../container/createpost";
import MakeComment from "../container/makecomment";
import MakeReply from "../container/makereply";
import MyPosts from "../container/myposts";
import PrivateRoute from "./privateRoutes";
import { useState } from "react";
import Nav from "../components/nav";

export default function Routes(){
	const[userId,setUserId]=useState("");
    const[uname,setUname]=useState("");
	const[email,setEmail]=useState("");
	const[logged,setLogged]=useState("");

	function getInfo(obj){
		setUserId(obj.userId);
		setUname(obj.uname);
		setEmail(obj.email);
		setLogged(obj.logged);
	}

	return(
		<><Nav logged={logged} uname={uname}/>
		    <Switch>
				<PrivateRoute exact path='/' check="home" cb={getInfo}>{
					(logged && userId && uname)?<Home logged={logged} userId={userId} uname={uname}/>:(logged===false)?<Home logged={logged}/>:""				}</PrivateRoute>
				<Route exact path='/login'>
					<Login/>
				</Route>
				<Route exact path='/signup'>
					<Signup/>
				</Route>
				<PrivateRoute exact path='/changepsw' cb={getInfo}>{
					(logged && email && uname)?<ChangePsw email={email} uname={uname}/>:(logged===false)?<Redirect to='/login'/>:""
				}</PrivateRoute>
				<Route exact path='/forgotpsw'>
					<ForgotPsw/>
				</Route>
				<Route exact path='/setpsw'>
					<SetPsw/>
				</Route>
				<PrivateRoute exact path='/createpost' cb={getInfo}>{
					(logged && userId && uname)?<CreatePost userId={userId} uname={uname}/>:(logged===false)?<Redirect to='/login'/>:""
				}</PrivateRoute>
				<PrivateRoute exact path='/makecomment' cb={getInfo}>{
					(logged && userId && uname)?<MakeComment userId={userId} uname={uname}/>:(logged===false)?<Redirect to='/login'/>:""
				}</PrivateRoute>
				<PrivateRoute exact path='/makereply' cb={getInfo}>{
					(logged && userId && uname)?<MakeReply userId={userId} uname={uname}/>:(logged===false)?<Redirect to='/login'/>:""
				}</PrivateRoute>
				<PrivateRoute exact path='/myposts' cb={getInfo}>{
					(logged && userId && uname)?<MyPosts userId={userId} uname={uname}/>:(logged===false)?<Redirect to='/login'/>:""
				}</PrivateRoute>
			</Switch>
		</>
	)
}