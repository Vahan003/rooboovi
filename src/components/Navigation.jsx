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
              <Link to="/rooboovi">Rooms</Link>
            </li>
            <li className="link">
              <Link to="/rooboovi/booking">Booking</Link>
            </li>
            <li className="link">
              <Link to="/rooboovi/visitors">Visitors</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/rooboovi/visitors">
            <Visitors />
          </Route>
          <Route path="/rooboovi/booking">
            <Booking />
          </Route>
          <Route path="/rooboovi">
            <Rooms />
          </Route>
        </Switch>
        </Fragment>
        </Router>);
    }

}

export default Navigation;