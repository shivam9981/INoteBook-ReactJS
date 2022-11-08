import React, {useContext, useState} from 'react'
import '../style/Home.css'
import nodecont from "../context/noteContext";
const AddNote = (props) => {
  let [value , setvalue] = useState({title : "" , description:"" , tag:""})
  const context = useContext(nodecont)
  const { setnotedata} = context;
  const handleclick = (e)=>{
    e.preventDefault()
    setnotedata(value.title.toString(),value.description.toString(), value.tag.toString())
    setvalue({title : "" , description:"" , tag:""})
    props.alertfun('Note added suceesfully', 'success')
  }
  
  const onchange = (e)=>{
    setvalue({...value, [e.target.name]:[e.target.value]})
  }


  return (
    <div className='conatiner-home'>
      <h1>Add New Notes</h1>
      <div className='text-class'>
        <div className='text-item'>
          <label id='title' className='lables'>Title</label>
          <input type="text" id='title' value={value.title} name = "title" placeholder='Enter your title' onChange={onchange} className='textbox' />
        </div>
        <div className='text-item'>
          <label id='description' className='lables'>Enter your text</label>
          <textarea type="text" id='description' value={value.description} name ="description" placeholder='Enter your text' onChange={onchange}/>
        </div>
        <div className='text-item'>
          <label id='tag' className='lables'>Tag</label>
          <input type="text" id='tag' value={value.tag} placeholder='Enter your tag' name='tag' className='textbox' onChange={onchange}/>
        </div>
        <div>
          <button className='txt-btn' onClick={handleclick}>submit</button>
        </div>
      </div>
    </div>
  )
}
export default AddNote