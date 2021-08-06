import React from 'react';

export default function TextArea(props){
    return(
        <textarea
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            style={{width: "100%",height:"30%",padding:"10px"}}
        />
    )
}