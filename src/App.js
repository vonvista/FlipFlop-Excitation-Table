import React, {useState, useRef} from "react";
import Tweet from "./tweet";
//import TruthTableButton from "./ButtonTruthTable";

function TopNav() {
  return(
    <div className="topnav">
      <a href="#home" class="active">Home</a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
      <a href="javascript:void(0);" class="icon" onclick="myFunction()">
        <i class="fa fa-bars"></i>
      </a>
    </div>
  )
}

function TruthTableButton(props){

  return(
    <div>
      <button onClick = {props.onClick} className = "button">{props.value}</button>
    </div>
  )
}

function TruthTableNumbers(props){

  return(
    <div>
      <button className = "button">{props.value}</button>
    </div>
  )
}

function TruthTableInputs(props){

  return(
    <div>
      <button className = "truthTablenums">{props.value}</button>
    </div>
  )
}


function TruthTableInputFunctions(props){

  return(
    <div>
      <button className = "truthTableInputFunctions">{props.value}</button>
    </div>
  )
}

function TruthTablePresentFunctions(props){

  return(
    <div>
      <button className = "truthTablePresentFunctions">{props.value}</button>
    </div>
  )
}


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


  return(
    <div className = "app">
      
      <div className = "row">
        {truthTableNums.map(element => (
          <TruthTableNumbers value = {element}/>
        ))}

        {truthTableInputs.map(element => (
          <TruthTableInputs value = {element}/>
        ))}

        {listTest.map(element => (
          <TruthTableButton value = {truthTable[element]} onClick = {() => handleClick(element)} key = {element}/>     
        ))}

        {inputFunctions.map(element => (
          <TruthTableInputFunctions value = {element}/>
        ))}
        
      </div>
    </div>
  )

}

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
        if(truthTable[i] == 0){
          inputFunctions[index] = 0;
        }
        else if(truthTable[i] == 1){
          inputFunctions[index] = 1;
        }
      }
    }
    //FOR T FLIP FLOP
    else if(props.flipflopType == "T"){
      for(let i = 0; i < bitsState * 2; i = i + 2){
        if(truthTable[i] == 0){
          if(truthTableNums[index] == 0){
            inputFunctions[index] = 0;
          }
          else{
            inputFunctions[index] = 1;
          }      
        }
        else if(truthTable[i] == 1){
          if(truthTableNums[index] == 0){
            inputFunctions[index] = 1;
          }
          else{
            inputFunctions[index] = 0;
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
        {truthTableNums.map(element => (
          <TruthTableNumbers value = {element}/>
        ))}

        {truthTableInputs.map(element => (
          <TruthTableInputs value = {element}/>
        ))}

        {inputFunctions.map(element => (
          <TruthTablePresentFunctions value = {element}/>
        ))}

        {listTest.map(element => (
          <TruthTableButton value = {truthTable[element]} onClick = {() => handleClick(element)} key = {element}/>     
        ))}
        
      </div>
    </div>
  )

}

function Labels(props){
  return(
    <div>
      <button className = "labels">{props.name}</button>
    </div>
  )
}

function App (){
  const [bitsState, setbitsState] = useState(3);
  const [numInputs, setNumInputs] = useState(1);

  const [flipflopType, setFlipflopType] = useState("JK");
  

  const [labels, setLabels] = useState([]);

  const [isTableShown, setTableShown] = useState(false);

  //const [inputs, setInputs] = useState(Array.from(Array(Math.pow(2,bitsState + numInputs)).keys()));

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
    if(isTableShown === false){
      setTableShown(true);
      makeLabels();
      setInputs(Array.from(Array(Math.pow(2,bitsState + numInputs)).keys()));
      //console.log(inputs); 
    }
    
  }

  const debugFunc = () => {
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

  const resetTable = () => {
    setInputs([]);
    setLabels([]);
    setTableShown(false);
  }
  
  const [renderLabels, setRenderLabels] = useState(false);
  if(renderLabels === false){
    //makeLabels();
    setRenderLabels(true);
  }


  return(
    document.title = "FlipFlop",
    <div className = "main">
      <TopNav/>
      <h1>Flip flop Excitation Table Generator</h1>
      <button onClick = {convertToBinary} className = "generalButton">BINARY TEST!</button>
      <button onClick = {debugFunc} className = "generalButton">DEBUG</button>
      {/* <button onClick = {makeLabels} className = "generalButton">LABEL TEST</button> */}
      <button onClick = {displayTable} className = "generalButton">DISPLAY TABLE</button>
      <button onClick = {resetTable} className = "generalButton">RESET TABLE</button>
      

      <div className = "row">

        <div className = "option">
          <h2>Set Bits</h2>
          <div className = "row">
            <button onClick = {() => setbitsState(bitsState - 1)} className = "truthTablenums">-</button>
            <h1> {bitsState} </h1>
            <button onClick = {() => setbitsState(bitsState + 1)} className = "truthTablenums">+</button>
          </div>
        </div>

        <div className = "option">
          <h2>Set Inputs</h2>
          <div className = "row">
            <button onClick = {() => setNumInputs(numInputs - 1)} className = "truthTablenums">-</button>
            <h1> {numInputs} </h1>
            <button onClick = {() => setNumInputs(numInputs + 1)} className = "truthTablenums">+</button>
          </div>
        </div>

        <div className = "option">
          <div className = "column">
          <h2>Flip Flop Type</h2>
            <button onClick = {changeFlipFlopType} className = "generalButton">{flipflopType}</button>
          </div>
        </div>
        
      </div>

      <h1>Type A Table (Modify Present State)</h1>
      
      <div className = "row">
        {labels.map(element => (
          <Labels name = {element}/>
        ))}
      </div>
      {inputs.map(element => (
        //<TruthTableRow inputs = {convertToBinary(element)} bitsState = {bitsState} numInputs = {numInputs} flipflopType = {flipflopType}/>
        <TruthTableRow inputs = {convertToBinary(element)} bitsState = {bitsState} numInputs = {numInputs} flipflopType = {flipflopType}/>
      ))}

      <h1>Type B Table (Modify Input Functions)</h1>
      
      <div className = "row">
        {labels.map(element => (
          <Labels name = {element}/>
        ))}
      </div>
      {inputs.map(element => (
        //<TruthTableRow inputs = {convertToBinary(element)} bitsState = {bitsState} numInputs = {numInputs} flipflopType = {flipflopType}/>
        <TruthTableRowTypeB inputs = {convertToBinary(element)} bitsState = {bitsState} numInputs = {numInputs} flipflopType = {flipflopType}/>
      ))}
      
    </div>
  )
}


export default App;