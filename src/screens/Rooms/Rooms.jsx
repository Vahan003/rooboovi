import React, { Component } from "react";
import { connect } from "react-redux";
import { getStatusThunk, getRoomsThunk } from "../../thunks";
import "./rooms.style.scss";
class Rooms extends Component {
  constructor(props){
    super(props)
   
  }
  componentDidMount() {
    this.props.getStatus();
    this.props.getRooms();
  }

  componentDidUpdate() {
    console.log("PROPS:", this.props);
  }
  onEdit = () => {
   console.log("Edit")
  }
  onDelete = ()=>{
    console.log("Delete")
  }
  
  render() {
    return (
      <div className="Rooms">
        <div className="RoomsLeftSide">
        <div className="amountAll">
            <div className="amount">
              {this.props.rooms.status.rooms?this.props.rooms.status.rooms: "-" }
              <div className="amountText">Rooms</div>
            </div>
            <div className="amount">
              {this.props.rooms.status.booking?this.props.rooms.status.booking: "-"}
              <div className="amountText">Booking</div>
            </div>
            <div className="amount">
              {this.props.rooms.status.visitors?this.props.rooms.status.visitors: "-"}
              <div className="amountText">Visitors</div>
            </div>
          </div>
          <div className="roomsInput">......</div>
        </div>
    <div className="RoomsRigthSide">
      <table>
      <thead className="theadT">
      <tr className="trH">
        <th>#ID</th>
      <th>Booked At</th>
      <th>Floor</th>
      <th>Beds</th>
      <th>Balcony</th>
      <th>Number</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
    </thead>
    <tbody className="tbodyT">
    { 
    
      this.props.rooms.rooms.map((e,ind)=>{
        const d = new Date(Date.parse(e.bookedAt));
        return (
        <tr key = {e.id}  className="trT">
          <th>{ind+1}</th>
        <th>{`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`}</th>
        <th>{e.floor}</th>
        <th>{e.beds}</th>
        <th className={e.balcony?"thGreen":"thRed"}>{e.balcony? "Yes": "No"} </th>
        <th>{e.roomId}</th>
        <th className="Edit" onClick={this.onEdit}></th>
        <th className="Delete" onClick={this.onDelete}></th>
        </tr>)
        })
    }
    </tbody>
    </table>
    </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { rooms } = state;
  return {
    rooms
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStatus: () => {
      dispatch(getStatusThunk());
    },
    getRooms: () =>{
      dispatch(getRoomsThunk());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
