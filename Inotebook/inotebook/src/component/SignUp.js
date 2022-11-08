import React, {  useState } from 'react'
import '../style/SignUp.css'
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {

  const history = useNavigate()
  const [text, settext] = useState({ name: "", email: "", mobile: "", pass: "", conf: "" })

  const onchange = (e) => {
    settext({ ...text, [e.target.name]: [e.target.value] })
  }

  const handleclick = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: text.name, email: text.email, mobile: text.mobile, password: text.pass })
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      settext({ name: "", email: "", mobile: "", pass: "", conf: "" })
      localStorage.setItem('token', json.authtoken)
      // alert("data saved")
      props.alertfun('SignUp  suceesfully', 'success')
      history("/")
    }
    else {
      alert("Email already exits")
    }
  }

  return (
    <div className='div-cont-1'>
      <h1 id="signup">SignUp Form</h1>
      <form className='container-form'>
        <div className='containet-div-1'>
          <label id='name' className='lab-1'>Name</label>
          <input type='text' placeholder="Enter your name" id="name" name="name" value={text.name} className='inp-1 ' onChange={onchange} />
        </div>
        <div className='containet-div-1'>
          <label id='email' className='lab-1'>Email</label>
          <input type='text' placeholder="Enter your Email" id="email" name="email" value={text.email} className='inp-1' onChange={onchange} />
        </div>
        <div className='containet-div-1'>
          <label id='mobile' className='lab-1'>Mobile Number</label>
          <input type='text' placeholder="Enter your mobile number" id="mobile" name="mobile" value={text.mobile} className='inp-1' onChange={onchange} />
        </div>
        <div className='containet-div-1'>
          <label id='pass' className='lab-1'>Password</label>
          <input type='text' placeholder="Enter your password" id="pass" name="pass" className='inp-1' value={text.pass} onChange={onchange} />
        </div>
        <div className='containet-div-1'>
          <label id='conf' className='lab-1'>Conform Password</label>
          <input type='text' placeholder="Enter your conform password" id="conf" name="conf" className='inp-1' value={text.conf} onChange={onchange} />
        </div>
        <div className='containet-div-1'>
          <button className='btn-1' onClick={handleclick}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp