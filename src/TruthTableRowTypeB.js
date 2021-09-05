import React, { useState } from "react";
import TruthTableBlock from "./TruthTableBlock";

function TruthTableRowTypeB(props){

  const [bitsState, setbitsState] = useState(props.bitsState);
  const [numInputs, setNumInputs] = useState(props.numInputs);

  const [truthTableNums, setTTNums] = useState(props.inputs.slice(0,props.bitsState));

  const [truthTableInputs, setTTInputs] = useState(props.inputs.slice(props.bitsState,props.bitsState + props.numInputs));

  const [inputFunctions, setInputFunctions] = useState(Array(bitsState).fill("x"));

  const [listTest, setList] = useState(Array.from(Array(bitsState * 2).keys()));

  const [truthTable, setTruthTable] = useState(Array(bitsState * 2).fill("x"));

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [renderedButtons, setRenderedButtons] = useState(false);


  const handleClick = (i) => {

    if(truthTable[i] == 0){
      truthTable[i] = 1;
    }
    else if(truthTable[i] == 1){
      truthTable[i] = 0;
    }
    else if(truthTable[i] == "x"){
      truthTable[i] = 0;
    }

    var index = Math.floor(i/2);


    //FLIP FLOP TYPE DETECT

    //FOR JK FLIP FLOP
    if(props.flipflopType == "JK"){
      for(let i = 0; i < bitsState * 2; i = i + 2){
        index = Math.floor(i/2);
        if(truthTable[i] == 0 && truthTable[i+1] == 0){
          if(truthTableNums[index] == 0){
            inputFunctions[index] = 0;
          }
          else{
            inputFunctions[index] = 1;
          }      
        }
        else if(truthTable[i] == 0 && truthTable[i+1] == 1){
          inputFunctions[index] = 0;
        }
        else if(truthTable[i] == 1 && truthTable[i+1] == 0){
          inputFunctions[index] = 1;
        }
        else if(truthTable[i] == 1 && truthTable[i+1] == 1){
          if(truthTableNums[index] == 0){
            inputFunctions[index] = 1;
          }
          else{
            inputFunctions[index] = 0;
          }
        }
      }
    }
    //FOR SR FLIP FLOP
    else if(props.flipflopType == "SR"){
      for(let i = 0; i < bitsState * 2; i = i + 2){
        index = Math.floor(i/2);
        if(truthTable[i] == 0 && truthTable[i+1] == 0){
          if(truthTableNums[index] == 0){
            inputFunctions[index] = 0;
          }
          else{
            inputFunctions[index] = 1;
          }      
        }
        else if(truthTable[i] == 0 && truthTable[i+1] == 1){
          inputFunctions[index] = 0;
        }
        else if(truthTable[i] == 1 && truthTable[i+1] == 0){
          inputFunctions[index] = 1;
        }
        else if(truthTable[i] == 1 && truthTable[i+1] == 1){
          inputFunctions[index] = "?";
        }
      }
    }

    //FOR D FLIP FLOP
    else if(props.flipflopType == "D"){
      for(let i = 0; i < bitsState * 2; i = i + 2){
        index = Math.floor(i/2);
        if(truthTable[i] == 0){
          inputFunctions[index] = 0;
        }
        else if(truthTable[i] == 1){
          inputFunctions[index] = 1;
        }
      }
      console.log(inputFunctions);
    }
    //FOR T FLIP FLOP
    else if(props.flipflopType == "T"){
      for(let i = 0; i < bitsState * 2; i = i + 2){
        index = Math.floor(i/2);
        if(truthTable[i] == 1){
          if(truthTableNums[index] == 0){
            inputFunctions[index] = 1;
          }
          else if(truthTableNums[index] == 1){
            inputFunctions[index] = 0;
          }      
        }
        else if(truthTable[i] == 0){
          if(truthTableNums[index] == 0){
            inputFunctions[index] = 0;
          }
          else if(truthTableNums[index] == 1){
            inputFunctions[index] = 1;
          }      
        }
      }
    }


    console.log(inputFunctions);
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

  const [constructor, setConstructor] = useState(false);
  if(constructor === false){
    if(props.flipflopType == "D" || props.flipflopType == "T"){
      for(let i = 1; i < bitsState * 2; i = i + 2){
        truthTable[i] = "-";
      }
    }
    setConstructor(true);
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

        {inputFunctions.map((element, index) => (
          <TruthTableBlock value = {element} onClick = {null} className = "truthTablePresentFunctions" key={index}/>
        ))}

        {listTest.map((element, index) => (
          <TruthTableBlock value = {truthTable[element]} onClick = {() => handleClick(element)} 
          key = {index} className = "button"/>     
        ))}
        
      </div>
    </div>
  )

}

export default TruthTableRowTypeB;