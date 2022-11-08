import './App.css';
import Navabr from './component/Navabr';
import { Routes, Route } from "react-router-dom";
import Home from "./component/Home.js"
import About from "./component/About.js"
import Login from "./component/Login.js"
import SignUp from "./component/SignUp.js"
import Notestate from './context/NoteState';
import Alert from './component/Alert';
import { useState } from 'react';

function App() {

  const [alert, showalert] = useState()

  let alertfun = (msg,type)=>{
    showalert({
      msg:msg,
      type:type
    })
  }

  return (
    <div className="App">
      <Notestate>
      <Navabr alertfun={alertfun}/>
      <Alert alert={alert}/>
      <Routes>
        <Route path='/Home' element = {<Home alertfun={alertfun}/>}/>
        <Route path='/About' element = {<About />}/>
        <Route path='/' element = {<Login alertfun={alertfun}/>}/>
        <Route path='/SignUp' element = {<SignUp alertfun={alertfun} />}/>
      </Routes>
      </Notestate>
    </div>
  );
}

export default App;
