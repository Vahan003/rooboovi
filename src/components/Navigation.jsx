import React,{ PureComponent,Fragment} from 'react'
import Rooms from '../screens/Rooms'
import Booking from '../screens/Booking'
import Visitors from '../screens/Visitors'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class Navigation extends PureComponent{
 
    render(){
        return (
            <Router>
      <Fragment>
        <nav className="navigation">
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
          <Route path="/visitors">
            <Visitors />
          </Route>
          <Route path="/booking">
            <Booking />
          </Route>
          <Route path="/">
            <Rooms />
          </Route>
        </Switch>
        </Fragment>
        </Router>);
    }

}

export default Navigation;