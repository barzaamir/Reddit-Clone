import React from 'react';

export default function Input(props){
    return(
        <input
            value={props.value}
            type={props.type}
            onChange={props.onChange}
            placeholder={props.placeholder}
            required
            style={
                {height: "30px",
                width: "100%"}
            }
        />
    )
}