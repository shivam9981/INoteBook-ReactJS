import React, { useState } from 'react'
import '../style/SignUp.css'
import { useNavigate } from "react-router-dom";

const Login = (props) => {

  const [text, settext] = useState({ email: "", pass: "" })
  const history = useNavigate()

  const onchange = (e) => {
    settext({ ...text, [e.target.name]: [e.target.value] })
  }

  const handleclick = async (e) => {
    e.preventDefault();
    // console.log(text)
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: text.email , password: text.pass})
    })
    const json = await response.json();
    if (json.success) {
      settext({ email: "", pass: ""})
      localStorage.setItem('token', json.authtoken)
      props.alertfun('Login Sucessfully', 'success')
      history("/Home")
    }
    else {
      alert("Invalid Email and Password")
    }
  }

  const heading = {
    marginTop : "3em"
  }

  return (
    <div className='div-cont-1'>
      <h1 style={heading}>Login Form</h1>
      <form className='container-form'>
        <div className='containet-div-1'>
          <label id='email' className='lab-1'>Email</label>
          <input type='text' placeholder="Enter your Email" id="email" value={text.email} name="email" className='inp-1' onChange={onchange} />
        </div>
        <div className='containet-div-1'>
          <label id='pass' className='lab-1'>Password</label>
          <input type='text' placeholder="Enter your password" id="pass" value={text.pass} name="pass" className='inp-1' onChange={onchange} />
        </div>
        <div className='containet-div-1'>
          <button className='btn-1' onClick={handleclick}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login