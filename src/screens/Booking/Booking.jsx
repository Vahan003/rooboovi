import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBookingThunk } from '../../thunks'
import './booking.style.scss'
class Booking extends Component {

  componentDidMount() {
    this.props.getBooking()
    console.log('PROPS:', this.props)
  }

  componentDidUpdate() {
    console.log('PROPS:', this.props)
  }
  onbut=()=>{
     console.log(this.props.rooms.status)
     
  }
  render() {
    return (
      <div className="Booking">
        <div className="BookingLeftSide">
        <div className="bookingInput">
          ...
        </div>
        </div>
        <div className="BookingRigthSide">
        <table>
      <thead className="theadT">
      <tr className="trH">
        <th>#ID</th>
      <th>Person Name</th>
      <th>Room ID</th>
      <th>Booked At</th>
      <th>Person ID</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
    </thead>
    <tbody className="tbodyT">
    { 
    
      this.props.booking.booking.map((e,ind)=>{
        const d = new Date(Date.parse(e.bookedAt));
        return (
        <tr key = {e.id}  className="trT">
          <th>{ind+1}</th>
        <th>{e.personName}</th>
        <th>{e.roomNumber}</th>
        <th>{`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`}</th>
        <th>{e.personId}</th>
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

const mapStateToProps = (state) => {
  const { booking } = state
  return {
    booking
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBooking: () => {
      dispatch(getBookingThunk())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Booking);