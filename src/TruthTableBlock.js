import React from "react";

function TruthTableBlock(props){

  return(
    <div>
      <button onClick = {props.onClick} className = {props.className}>{props.value}</button>
    </div>
  )
}

export default TruthTableBlock;