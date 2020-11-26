import React,{ PureComponent,Fragment} from 'react'
import Rooms from '../screens/Rooms'
import Booking from '../screens/Booking'
import Visitors from '../screens/Visitors'
import Page404 from './Page404'
import {
   // BrowserRouter as Router,
    Switch,
    Route,
    Link,
    HashRouter 
  } from "react-router-dom";

class Navigation extends PureComponent{

    render(){
        return (
          <HashRouter>
            
      <Fragment>
          <div>
        <nav className="navigation" >
          <ul className="links">
            <li className="link">
              <Link to="/">Rooms</Link>
            </li>
            <li className="link">
              <Link to="/booking">Booking</Link>
            </li>
            <li className="link">
              <Link to="/visitors">Visitors</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component = {Rooms}/>
          <Route path="/visitors" component={Visitors}/>
          <Route path="/booking" component={Booking}/>
          <Route component={Page404} />
        </Switch>
          </div>
        </Fragment>
        
        </HashRouter>);
    }

}

export default Navigation;