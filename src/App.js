import React, { useState } from "react";
import "./App.css";
import TruthTableRow from "./TruthTableRow";
import TruthTableRowTypeB from "./TruthTableRowTypeB";
import Labels from "./Labels";
//import TruthTableButton from "./ButtonTruthTable";

function App (){
  const [bitsState, setbitsState] = useState(3);
  const [numInputs, setNumInputs] = useState(1);

  const [flipflopType, setFlipflopType] = useState("JK");

  const [labels, setLabels] = useState([]);

  const [inputs, setInputs] = useState([]);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const changeFlipFlopType = () => {
    if(flipflopType == "JK"){
      setFlipflopType("SR");
    }
    else if(flipflopType == "SR"){
      setFlipflopType("D");
    }
    else if(flipflopType == "D"){
      setFlipflopType("T");
    }
    else if(flipflopType == "T"){
      setFlipflopType("JK");
    }
  }

  const convertToBinary = (dec) => {
    dec = dec.toString(2);
    
    while(dec.length < bitsState + numInputs){
      dec = 0 + dec;
    }
    return dec.toString(2).split("");
    
  }

  const displayTable = () => {
    if(inputs.length === 0){
      makeLabels();
      setInputs(Array.from(Array(Math.pow(2,bitsState + numInputs)).keys()));
    }
  }
  const resetTable = () => {
    setInputs([]);
    setLabels([]);
  }

  const makeLabels = () => {
    const alphabetArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    var labelAppend = [];
    for(let i = 0; i < bitsState; i++){
      labelAppend.push(alphabetArray[i])
    }

    for(let i = 0; i < numInputs; i++){
      labelAppend.push("Input")
    }

    for(let i = 0; i < bitsState; i++){
      labelAppend.push(alphabetArray[i])
    }

    if(flipflopType == "JK"){
      for(let i = 0; i < bitsState; i++){
        labelAppend.push("J" + alphabetArray[i])
        labelAppend.push("K" + alphabetArray[i])
      }
    }
    else if(flipflopType == "SR"){
      for(let i = 0; i < bitsState; i++){
        labelAppend.push("S" + alphabetArray[i])
        labelAppend.push("R" + alphabetArray[i])
      }
    }
    else if(flipflopType == "D"){
      for(let i = 0; i < bitsState; i++){
        labelAppend.push("D")
        labelAppend.push(alphabetArray[i])
      }
    }
    else if(flipflopType == "T"){
      for(let i = 0; i < bitsState; i++){
        labelAppend.push("T")
        labelAppend.push(alphabetArray[i])
      }
    }
    
    setLabels(labelAppend);
  }
  
  const [renderLabels, setRenderLabels] = useState(false);
  if(renderLabels === false){
    //makeLabels();
    setRenderLabels(true);
  }


  return(
    document.title = "FlipFlop",
    <div className = "main">

      <div className = "titleParent">
        <h1>Flip flop Excitation Table Generator</h1>
      </div>

      <div className = "optionsParent">

        <div className = "option">
          <h2>Set Bits</h2>

          <button onClick = {() => setbitsState(bitsState - 1)} className = "truthTablenums">-</button>
          <h1> {bitsState} </h1>
          <button onClick = {() => setbitsState(bitsState + 1)} className = "truthTablenums">+</button>
        </div>

        <div className = "option">
          <h2>Set Inputs</h2>

          <button onClick = {() => setNumInputs(numInputs - 1)} className = "truthTablenums">-</button>
          <h1> {numInputs} </h1>
          <button onClick = {() => setNumInputs(numInputs + 1)} className = "truthTablenums">+</button>
        </div>

        <div className = "option">
          <h2 >Flip Flop Type</h2>
          <button onClick = {changeFlipFlopType} className = "generalButton">{flipflopType}</button>
        </div>
        
      </div>

      <div className = "generatorParent">
        <button onClick = {displayTable} className = "generalButton">DISPLAY TABLE</button>
        <button onClick = {resetTable} className = "generalButton">RESET TABLE</button>
      </div>
      
      <div className = "bodyParent">
        { 
          inputs.length !== 0 && <h1>Type A Table (Modify Present State)</h1>  
        }
        
        <div className = "row">
          {labels.map((element,index) => (
            <Labels name = {element} key={index}/>
          ))}
        </div>
        {inputs.map((element,index) => (
          <TruthTableRow inputs = {convertToBinary(element)} bitsState = {bitsState} 
          numInputs = {numInputs} flipflopType = {flipflopType} key={index}/>
        ))}

        <br/>

        { 
          inputs.length !== 0 && <h1>Type B Table (Modify Input Functions)</h1>
        }
        
        
        <div className = "row">
          {labels.map((element,index) => (
            <Labels name = {element} key={index}/>
          ))}
        </div>
        {inputs.map((element,index) => (
          <TruthTableRowTypeB inputs = {convertToBinary(element)} bitsState = {bitsState} 
          numInputs = {numInputs} flipflopType = {flipflopType} key={index}/>
        ))}
      </div>
    </div>
  )
}


export default App;