import nodeContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
    const note =[]

    const [notes, setnotes] = useState(note)
        const fatchnote = async ()=>{
            const response = await fetch(`http://localhost:5000/api/auth/fatchnotes` , {
                method:'GET',
                headers:{
                    'content-type':'application/json',
                    'auth-token':localStorage.getItem('token')
                }
            })
            const json = await response.json()
            setnotes(json)
        }
    const setnotedata = async (title, description, tag) => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/addnotes`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            })
            const json = await response.json();
            setnotes(notes.concat(json))
        } catch (error) {
            console.log(error)
        }
    }

    const updatenotedata = async (id, title,description,tag) => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            })
            const json = await response.json();

            for (let index = 0; index < notes.length; index++) {
                const element = notes[index];
                if (element._id===id) {
                    element.title = title;
                    element.description = description;
                    element.tag = tag
                    setnotes(notes.concat(json))
                    window.location.reload();
                }

            }
        } catch (error) {
            console.log(error)
        }
    }

    const deletenotedata = async (id) => {
        const newnote = notes.filter((note) => {
            return note._id !== id
        })
        const response = await fetch(`http://localhost:5000/api/auth/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const json = await response.json();
        console.log(json)
        setnotes(newnote)
        // props.alertfun('Note delete suceesfully', 'success')
        console.log("delete note", id)
    }

    return (
        <nodeContext.Provider value={{ notes, setnotes, setnotedata, updatenotedata, deletenotedata ,fatchnote}}>
            {props.children}
        </nodeContext.Provider>
    )
}

export default NoteState;