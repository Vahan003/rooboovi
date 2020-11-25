import React from "react"
import loading from '../images/gifs/loading.gif'
const Loading = (props) =>{
    return <div style = {{
        display: props.display === "none" ? "none": "flex",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "100px"
    }}>
        <img src ={loading} height="150"></img>
    </div>
}
export default Loading