import React from 'react';
import styles from './style.module.css';

export default function Message(props){

    let style={
        "error":styles.error,
        "success":styles.success
    }

    return(
        <label className={style[props.type]}>
            {props.text}
        </label>
    )
}