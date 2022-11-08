import React  from 'react'
import "../style/NavBar.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useState } from "react"

const Navabr = (props) => {
  const history = useNavigate();
  // const [style, fillstyle] = useState(null)
  const handlelogout = () => {
    localStorage.removeItem('token')
    props.alertfun('Logout suceesfully', 'success')
    history('/')
  }
  // let success = true;
  // var heading
  // let onclickfun = ()=>{

  //   let check = document.getElementById('check')
  //   // let varia = document.getElementsByClassName('title-home')
  //   // console.log(check.checked)
    
  //   if (check.checked) {
  //     console.log("work")
  //     document.querySelector('toggle').style.left = "-100%"
  //   }
  //   else{
  //     // heading = {
  //     //   color:"blue"
    
  //     console.log("not work")  
  //   }
  //   }
  // }
  // onClick={onclickfun}
  return (
    <>
       {/* <div>
        <input type="checkbox" id="check"   />
        <label htmlFor="check" className='checkbtn'>
          <i className='fas fa-bars'></i>
        </label>
      </div> */}

      {/* Navabr start */}
      <div className='container1'>
        <div className='list-class'>
          <h1 className='title-home' >INOTEBOOK</h1>
        </div>
        <div className='list-class'>
          {/* list litm */}
          <div className='test' >
          <ul className='list toggle'>
            <li><Link className='link-a' to='/Home'>Home</Link></li>
            <li><Link to='/About' className='link-a'>About</Link></li>
            {!localStorage.getItem('token') ? <div className='list list1'>
              <li><Link to='/' className='link-a'>Login</Link></li>
              <li><Link to='/SignUp' className='link-a'>SignUp</Link></li>
            </div> :
              <button onClick={handlelogout} className='btn'>LogOut</button>}
          </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navabr
