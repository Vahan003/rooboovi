import React, {Fragment, useEffect, useState} from 'react';
import Navigation from './components/Navigation.jsx'
import Loading from "./components/Loading";
import './App.scss';

function App() {
   return(
   <Fragment>
     <div className="toptab">
         Made by Vahan Muradyan
     </div>
       <Navigation/>
   </Fragment>)
}
export default App;
