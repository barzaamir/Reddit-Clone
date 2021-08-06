import React from 'react';
import styles from './style.module.css';

export default function Button(props){
    let style={
        large:styles.large,
        selected:styles.selected
    }
    let className;
    if(props.selected){
        className=styles.btn+" "+style[props.type]+" "+styles.selected;
    }
    else{
        className=styles.btn+" "+style[props.type];
    }
    
    return(
        <button onClick={props.onClick} className={className}>
            {props.text}
        </button>
    )
}