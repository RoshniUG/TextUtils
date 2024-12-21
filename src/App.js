import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import { useState } from 'react';
import Alert from './components/Alert';

import React from "react";
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Link
} from "react-router-dom";


function App() {
  const [mode,setMode] = useState('dark');
  const [alert, setAlert] = useState(null);

  const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      type: type
    })
    setTimeout(() => { setAlert(null); }, 2000); 
  };

  


  const toggleMode = () =>{
    if(mode === 'light')
    {
      setMode ('dark');
      document.body.style.backgroundColor = '#052647';
      showAlert("Dark mode has been enabled","success");
      document.title = 'TextUtils-Dark Mode';
      // setInterval(()=>{
      //   document.title = 'TextUtils is Amazing Mode';
      // },2000)
      // setInterval(()=>{
      //   document.title = 'Install TextUtils now!';
      // },1300);
    }
    else
    {
      setMode ('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled","success");
      document.title = 'TextUtils-Light Mode';
    }
  }
  return (
    <>
    <Router>
<Navbar title ="TextUtils" aboutText = " About" mode={mode} toggleMode = {toggleMode}/> 
{/* importing the navbar */}

<Alert alert={alert}/>

<div className="container">
<Routes>
          <Route exact path="/about"
           element =  {<About />} />
        
          
          <Route exact path="/"
          element = {<TextForm heading =" Enter the text to analyze below:" showAlert={showAlert} mode={mode}/>} />
         
        </Routes>
       
</div>
</Router>
 </>
   
  );
  }

export default App;
