import nodeContext from "./noteContext";
import React, { useState } from "react";
import Alert from "../component/Alert";


const NoteAlert = (props)=>{

    const [alert, showalert] = useState()

    let alertfun = (msg,type)=>{
        showalert({
          msg:msg,
          type:type
        })
      }

    return(
        <>
        <Alert  alert = {alert}/>
        <nodeContext.Provider value={{alertfun}}>
            {props.children}
        </nodeContext.Provider>
        </>
    )
}

export default NoteAlert;