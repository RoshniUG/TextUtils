import React ,{useState} from 'react'
 

export default function TextForm(props) 
{

  const handleUpClick =()=>{
    console.log("Uppercase was clicked "+text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase!","success");
  };

   const handleLcClick =() =>{
    let newtext = text.toLowerCase();
    setText(newtext);
    props.showAlert("Converted to lowercase!","success");
   };

   const handleClearText = () =>{
    let newText = '';
    setText(newText);
    props.showAlert("Cleared text!","success");
   };

   const handleCopy =()=>{
    var text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Copied the text!","success");
   };

   const handleExtraSpaces = () =>{
    let newText = text.split(/[  ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra spaces are removed!","success");
   }

  const handleOnChange =(event)=>{
    setText(event.target.value);
  };

 const handleFindWord = () =>{
if(findWord.trim() === "")
{
  alert("Please enter a word a find.");
  return ;
}
 
  const regex = new RegExp(`\\b${findWord}\\b`,"gi");
  if(regex.test(text))
  {
    const highlighted = text.replace(regex,
      `<span class = "highlight">${findWord}</span>`
    );
    setHighlightedText(highlighted);
   // alert(`The word "${findWord}" was found in the text.`);
   props.showAlert("Word is found","success");
  }
  else
  {
    setHighlightedText(text);
    //alert(`The word "${findWord}" was not found in the text`);
    props.showAlert("Oops!,Word is not found","warning");
  }
  
  };

const handleReplaceWord = () =>{
  if(findWord.trim() === "")
  {
    alert("Please a enter a word to find.");
    return ;
  }
  const regex = new RegExp(`\\b${findWord}\\b`,"gi");
  if(regex.test(text))
  {
    const newText = text.replace(regex,replaceWord);
    setText(newText);
    setHighlightedText('');
    //alert(`All occurences of "${findWord}" have been replaced with "${replaceWord}`);
    props.showAlert("Word is replaced","success");
  }
  else{
   // alert(`The word "${findWord}" was not found in the text.`);
   props.showAlert("Oops!,Word is not found","warning");
  }
}


    const [text , setText] = useState('');
    const [findWord,setFindWord] = useState('');
    const [replaceWord,setReplaceWord] = useState('');
    const [highlightedText,setHighlightedText] = useState('');
  return (
    <>
   
    <div className='container' style ={{ color: props.mode === 'light' ? '#052647' : 'white' }}>
        <h1>{props.heading} </h1>
<div className="mb-3" >
  <textarea className="form-control" value = {text} onChange={handleOnChange} style={{backgroundColor:props.mode === 'dark'?'grey':'white',color:props.mode === 'dark'?'white':'#052647'} }id="myBox" rows="8"></textarea>
</div>
<button className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>Convert to Uppercase</button>
<button className="btn btn-primary mx-2 my-2" onClick = {handleLcClick}>Convert to lowercase</button>
<button className="btn btn-primary mx-2 my-2" onClick = {handleClearText}>Clear Text</button>

<button className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy Text</button>

<button className="btn btn-primary mx-2 my-2" onClick={handleExtraSpaces}>Remove Extra Spaces</button>

<div className="my-3" style={{color:props.mode === 'light'?'#052647':'white'}}>
 <input type="text" className="form-control my-2 " placeholder='FindWord' style={{backgroundColor:props.mode === 'dark'?'grey':'white',color:props.mode === 'dark'?'white':'#052647'}} value = {findWord} onChange={(e) => setFindWord(e.target.value)} />

  <input type="text" className="form-control my-2 " placeholder='ReplaceWord' style={{backgroundColor:props.mode === 'dark'?'grey':'white',color:props.mode === 'dark'?'white':'#052647'}} value={replaceWord} onChange={(e) => setReplaceWord(e.target.value)} />
  
  <button className="btn btn-success mx-2 my-2" onClick={handleFindWord}>Find Word</button>
  <button className="btn btn-warning mx-2 my-2" onClick={handleReplaceWord}>Replace Word</button>
</div>
    </div>
    <div className="container my-5" style={{color:props.mode === 'light'?'#052647':'white'}}>
      <h2>Your text Summary</h2>
      <p>{(text.split(" ").length)-1} words and {text.length} characters</p>
      <p>{0.008 * text.split(" ").length} Minutes read</p>
      <h2>Preview</h2>
     
      <div
        dangerouslySetInnerHTML = {{
          __html: highlightedText || (text.length>0?text:"Enter something to preview it here"),

         }}
         />
      </div>
    
    <style jsx = "true">{`
  .highlight {
    background-color: yellow;
    color:black;
    font-weight: bold;
  }
  `}
</style>

    </>
  );
  
}
