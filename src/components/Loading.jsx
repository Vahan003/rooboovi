import React from "react"
import loading from '../images/gifs/loading.gif'
const Loading = () =>{
    return <div style = {{
        display: "flex",
        justifyContent: "center",
        margin: "0 0 1vh",
    }}>
        <img className="spiner" src ={loading} ></img>
    </div>
}
export default Loading