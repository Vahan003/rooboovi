import React, {Fragment, useEffect, useState} from 'react';
import Navigation from './components/Navigation.jsx'
import Loading from "./components/Loading";
import './App.scss';

function App() {
    const [loading,setLoading] = useState("hidden")
    const [loader,setLoader] = useState("")
    const wait = () => {
        setTimeout(()=>{
            setLoading("visible");
            setLoader("none")
        },2000)
    }
    useEffect(()=>{
        wait()
    },[])
   return(
   <Fragment>
     <div className="toptab">
         Made by Vahan Muradyan
     </div>
       <Loading display = {loader}/>
       <Navigation  visibility = {loading}/>
   </Fragment>)
}
export default App;
