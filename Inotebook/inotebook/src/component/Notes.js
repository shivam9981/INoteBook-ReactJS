import React, { useContext } from 'react'
import '../style/Notes.css'
import content from '../context/noteContext'
// import model from './Model'
const Notes = (props) => {
    const context = useContext(content)
    const {deletenotedata} = context;
    const {handleclick2} = props
    const handleclick = ()=>{
        deletenotedata(props.value._id)    
        props.alertfun('Note Delete suceesfully', 'success')
    }
    
    return (

        <div>
            {/* <model /> */}
            <div className='note-container1'>
                <div className='note-div1'>
                    <label>Title : </label>
                    <p>{props.value.title}</p>
                </div>
                <hr color='black' />
                <div className='note-div11'>
                    <label>Description : </label>
                    <p>{props.value.description}</p>
                </div>
                <hr color='black' />
                <div className='note-div1'>
                    <label>tag : </label>
                    <p>{props.value.tag}</p>
                </div>
                <div className='note-div2'>
                    <i className="fa-solid fa-trash-can" onClick={handleclick}></i>
                    <i className="fa-solid fa-pen-to-square" onClick={()=>{handleclick2(props.value)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Notes