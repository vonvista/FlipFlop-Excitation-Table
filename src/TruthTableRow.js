import React, { useState } from "react";
import TruthTableBlock from "./TruthTableBlock";

function TruthTableRow(props){

  const [bitsState, setbitsState] = useState(props.bitsState);
  const [numInputs, setNumInputs] = useState(props.numInputs);

  const [truthTableNums, setTTNums] = useState(props.inputs.slice(0,props.bitsState));

  const [truthTableInputs, setTTInputs] = useState(props.inputs.slice(props.bitsState,props.bitsState + props.numInputs));

  const [inputFunctions, setInputFunctions] = useState(Array(bitsState).fill("x"));

  const [listTest, setList] = useState(Array.from(Array(bitsState).keys()));

  const [truthTable, setTruthTable] = useState(Array(bitsState + numInputs).fill("x"));

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [renderedButtons, setRenderedButtons] = useState(false);


  const handleClick = (i) => {
    if(truthTable[i] == 0){
      truthTable[i] = 1;
    }
    else if(truthTable[i] == 1){
      truthTable[i] = "x";
    }
    else if(truthTable[i] == "x"){
      truthTable[i] = 0;
    }

    //FLIP FLOP TYPE DETECT

    //FOR JK FLIP FLOP
    if(props.flipflopType == "JK"){
      if(truthTableNums[i] == 0 && truthTable[i] == 0){
        inputFunctions[i] = "0 x";
      }
      else if(truthTableNums[i] == 0 && truthTable[i] == 1){
        inputFunctions[i] = "1 x";
      }
      else if(truthTableNums[i] == 1 && truthTable[i] == 0){
        inputFunctions[i] = "x 1";
      }
      else if(truthTableNums[i] == 1 && truthTable[i] == 1){
        inputFunctions[i] = "x 0";
      }
      else{
        inputFunctions[i] = "x";
      }
    }
    //FOR SR FLIP FLOP
    else if(props.flipflopType == "SR"){
      if(truthTableNums[i] == 0 && truthTable[i] == 0){
        inputFunctions[i] = "0 x";
      }
      else if(truthTableNums[i] == 0 && truthTable[i] == 1){
        inputFunctions[i] = "1 0";
      }
      else if(truthTableNums[i] == 1 && truthTable[i] == 0){
        inputFunctions[i] = "0 1";
      }
      else if(truthTableNums[i] == 1 && truthTable[i] == 1){
        inputFunctions[i] = "x 0";
      }
      else{
        inputFunctions[i] = "x";
      }
    }

    //FOR D FLIP FLOP
    else if(props.flipflopType == "D"){
      if(truthTableNums[i] == 0 && truthTable[i] == 0){
        inputFunctions[i] = "0";
      }
      else if(truthTableNums[i] == 0 && truthTable[i] == 1){
        inputFunctions[i] = "1";
      }
      else if(truthTableNums[i] == 1 && truthTable[i] == 0){
        inputFunctions[i] = "0";
      }
      else if(truthTableNums[i] == 1 && truthTable[i] == 1){
        inputFunctions[i] = "1";
      }
      else{
        inputFunctions[i] = "x";
      }
    }

    //FOR T FLIP FLOP
    else if(props.flipflopType == "T"){
      if(truthTableNums[i] == 0 && truthTable[i] == 0){
        inputFunctions[i] = "0";
      }
      else if(truthTableNums[i] == 0 && truthTable[i] == 1){
        inputFunctions[i] = "1";
      }
      else if(truthTableNums[i] == 1 && truthTable[i] == 0){
        inputFunctions[i] = "1";
      }
      else if(truthTableNums[i] == 1 && truthTable[i] == 1){
        inputFunctions[i] = "0";
      }
      else{
        inputFunctions[i] = "x";
      }
    }
    forceUpdate();
  }

  const addItem = (index) => {
    setList([ ...listTest, {
      key: listTest.length,
      value: "x",
      onClick: () => handleClick(listTest.length)
    }])
  }

  const createButtons = () => {
    for(let i = 0; i < 3; i++){
      addItem(listTest.length);
    }
  }

  const consoleLogList = () => {
    console.log(listTest);
  }


  return(
    <div className = "app">
      
      <div className = "row">
        {truthTableNums.map((element, index) => (
          <TruthTableBlock value = {element} onClick = {null} className = "truthTablenums" key={index}/>
        ))}

        {truthTableInputs.map((element, index) => (
          <TruthTableBlock value = {element} onClick = {null} className = "truthTablenums" key={index}/>
        ))}

        {listTest.map((element, index) => (
          <TruthTableBlock value = {truthTable[element]} onClick = {() => handleClick(element)} 
          key={index} className = "button"/>     
        ))}

        {inputFunctions.map((element, index) => (
          <TruthTableBlock value = {element} onClick = {null} className = "truthTableInputFunctions" key={index}/>
        ))}
        
      </div>
    </div>
  )

}

export default TruthTableRow;