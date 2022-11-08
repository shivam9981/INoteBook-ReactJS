import React, { useContext, useState, useEffect, useRef } from 'react'
import '../style/Home.css'
import Notes from './Notes'
import nodecont from "../context/noteContext";
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";
const Home = (props) => {
  const {alertfun} = props
  let [value, setvalue] = useState({ etitle: "", edescription: "", etag: "" })
  const context = useContext(nodecont)
  const { notes, fatchnote,updatenotedata } = context;
  const history = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      fatchnote()
    }
    else{
      history('/')
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)

  const handleclick2 = (value) => {
    ref.current.click()
    console.log("home page check id")
    console.log(value._id)
    setvalue({id:value._id  , etitle:value.title, edescription:value.description , etag:value.tag})
  }
  
  const onchange = (e) => {
    setvalue({ ...value, [e.target.name]: [e.target.value] })
  }

  const handleclick = (e) => {
    console.log("update the note " ,value)
    updatenotedata(value.id.toString(),value.etitle.toString(), value.edescription.toString(), value.etag.toString())
    setvalue({ etitle: "", edescription: "", etag: "" })
    alertfun('Note Update suceesfully', 'success')
    refClose.current.click()
    
  }
  return (
    <>
      <AddNote alertfun={alertfun}/>
      <div>
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Notes</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* // add form in model */}
                <div className='text-class'>
                  <div className='text-item'>
                    <label id='title' className='lables'>Title</label>
                    <input type="text" id='title' value={value.etitle} name="etitle" placeholder='Enter your title' onChange={onchange} className='textbox1' />
                  </div>
                  <div className='text-item1'>
                    <label id='description' className='lables'>Enter your text</label>
                    <textarea type="text"  className='textarr' id='description1' value={value.edescription} name="edescription" placeholder='Enter your text' onChange={onchange} />
                  </div>
                  <div className='text-item'>
                    <label id='tag' className='lables'>Tag</label>
                    <input type="text" id='tag' value={value.etag} placeholder='Enter your tag' name='etag' className='textbox1' onChange={onchange} />
                  </div>
                </div>
                {/* ending form adding */}
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleclick}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='conatiner-home'>
        <p className='note-title'>this is my notes</p>
        <div className='container-home2'>
          {notes.map((note) => {
            return <Notes key={note._id} handleclick2={handleclick2} alertfun={alertfun} value={note} />
          })}
        </div>
      </div>
    </>
  )
}
export default Home