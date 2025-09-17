import React from 'react'

type ButtonName={
    name:string;
    onClick?:() => void;
}

export default function Button({name, onClick }:ButtonName){
    return(
    <button onClick={onClick} style={{
        borderRadius: "10px",
        padding: "0.6em",
        fontSize: "1em",
        color:"white",
        fontWeight: 500,
        fontFamily: "inherit",
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border:'1px solid rgba(255, 255, 255, 0.2)',
        minWidth:"100%",
  }}> {name}</button>)
}