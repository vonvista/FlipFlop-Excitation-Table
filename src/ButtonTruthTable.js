import React, {useState} from "react";

function TruthTableButton(){
  
  const [truthValue, setTruthValue] = useState(0);

  const getTruthState = () => {
    return truthValue;
  }

  const changeTruthValue = () => {
    if(truthValue == 0){
      setTruthValue(1);
    }
    else if(truthValue == 1){
      setTruthValue("x");
    }
    else if(truthValue == "x"){
      setTruthValue(0);
    }
  }

  return(
    <div className = "app">
      {/* <h1>{truthValue}</h1> */}
      <button onClick = {changeTruthValue} className = "button">{truthValue}</button>
    </div>
  )
}

export default TruthTableButton;
