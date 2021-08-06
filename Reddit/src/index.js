import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";

import App from './app.js';
const root=document.getElementById('root');
root.style.backgroundColor="#D3D3D3";
root.style.minHeight="100%";
root.style.height="relative";


ReactDOM.render(
	<BrowserRouter>
	    <App/>
	</BrowserRouter>,
	root
);