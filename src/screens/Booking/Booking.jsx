import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getBookingThunk,
  getVisitorsThunk,
  getRoomsThunk,
  postBookingThunk,
  putBookingThunk,
  deleteBookingThunk,
  putRoomThunk
} from "../../thunks";
import Loading from "../../components/Loading";
import "./booking.style.scss";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      updating: false,
      ID: "",
      loading: true,
      poster: {
        personName: "",
        roomNumber: "",
        roomId: "",
        personId: "",
        bookedAt: ""
      }
    };
  }
  checkEmtyInputs = () => {
    if (
      this.state.poster.personName !== "" &&
      this.state.poster.personId !== "" &&
      this.state.poster.roomNumber !== "" &&
      this.state.poster.bookedAt !== ""
    ) {
      this.setState({
        checked: true
      });
      return true;
    } else {
      this.setState({
        checked: false
      });
      return false;
    }
  };
  emtyInputs = () => {
    this.setState({
      poster: {
        ...this.state.poster,
        personName: "",
        roomNumber: "",
        roomId: "",
        personId: "",
        bookedAt: ""
      }
    });
  };
  getBookingAsync = async () => {
    await this.props.getBooking();
    this.setState({
      loading: false
    })
  }
  componentDidMount() {
    this.getBookingAsync()
    this.props.getVisitors();
    this.props.getRooms();
  }

  componentDidUpdate(PrevProps) {
    if (this.props.booking.postBooking.data !== PrevProps.booking.postBooking.data) {
      this.setState({
        loading: true
      })
      this.getBookingAsync()
      this.props.getVisitors();
      this.props.getRooms();
    }
  }
  getInp = e => {
    this.setState({
      poster: {
        ...this.state.poster,
        [e.target.name]: e.target.value
      }
    });
  };
  updateRoomBookingDate = id => {
    let roomPoster = {};
    this.props.rooms.rooms.filter(e => {
      if (e.id === id) {
        roomPoster = e;
        roomPoster.bookedAt = this.state.poster.bookedAt;
        return true;
      }
    });
    this.props.updateRoom(roomPoster, id);
  };
  chPersonID = e => {
    const value = e.target.value.split(",");
    this.setState({
      poster: {
        ...this.state.poster,
        personName: value[0],
        personId: value[1]
      }
    });
  };
  chRoomID = e => {
    const value = e.target.value.split(",");
    this.setState({
      poster: {
        ...this.state.poster,
        roomNumber: value[0],
        roomId: value[1]
      }
    });
  };
  onCreate = () => {
    if (this.checkEmtyInputs()) {
      this.props.createBooking(this.state.poster);
      this.updateRoomBookingDate(this.state.poster.roomId);
    }
  };
  onDelete = elem => {
    this.props.deleteBooking(elem.id);
  };
  onUpdate = () => {
    if (this.checkEmtyInputs()) {
      this.props.updateBooking(this.state.poster, this.state.ID);
      this.updateRoomBookingDate(this.state.poster.roomId);
      if (this.props.rooms.postRoomStatus) {
        this.setState({
          updating: false
        });
      } else {
        this.setState({
          updating: true
        });
      }
    } else {
      this.setState({
        updating: true
      });
    }
  };
  onEdit = (elem, person, room) => {
    this.setState({
      updating: true,
      ID: elem.id,
      poster: {
        ...this.state.poster,
        personName: elem.personName,
        roomId: elem.roomId,
        roomNumber: elem.roomNumber,
        personId: elem.personId,
        bookedAt: elem.bookedAt
      }
    });
    //----------------------------------------------------------
    for(let i=1;i<person.options.length;i++){
      if(person.options[i].text === elem.personName){
      person.options.selectedIndex = i
      break
      }
        person.options.selectedIndex = 0
    }
    for(let i=1;i<room.options.length;i++){
      if(room.options[i].text === `${elem.roomNumber}`){
        room.options.selectedIndex = i
        break
      }
       room.options.selectedIndex = 0
    }
    //----------------------------------------------------------
  };
  render() {
    return (
      <div className="Booking">
        <div className="BookingLeftSide">
          <div className="bookingInput">
            <div className="inpSection">
              New Booking
              <div className="inp">
                Person Name
                <select id = "person"
                  name="personName"
                  onChange={this.chPersonID}
                  className={
                    this.state.checked && this.props.booking.postBookingStatus
                      ? this.state.updating
                        ? "greenborder"
                        : ""
                      : "redborder"
                  }
                >
                  <option value="" hidden>
                    Choose
                  </option>
                  {this.props.visitors.visitors.map(e => (
                    <option key={e.id} value={[e.personName, e.personId]} >
                      {e.personName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="inp">
                Person ID
                <input
                  name="personId"
                  readOnly
                  className={
                    this.state.checked && this.props.booking.postBookingStatus
                      ? this.state.updating
                        ? "greenborder"
                        : ""
                      : "redborder"
                  }
                  value={this.state.poster.personId}
                ></input>
              </div>
              <div className="inp">
                Room ID
                <select id = "room"
                  name="roomId"
                  onChange={this.chRoomID}
                  className={
                    this.state.checked && this.props.booking.postBookingStatus
                      ? this.state.updating
                        ? "greenborder"
                        : ""
                      : "redborder"
                  }
                >
                  <option value="" hidden>
                    Choose
                  </option>
                  {this.props.rooms.rooms.map(e => (
                    <option key={e.id} value={[e.roomId, e.id]}>
                      {e.roomId}
                    </option>
                  ))}
                </select>
              </div>
              <div className="inp">
                Date
                <input
                  type="date"
                  name="bookedAt"
                  onChange={this.getInp}
                  className={
                    this.state.checked && this.props.booking.postBookingStatus
                      ? this.state.updating
                        ? "greenborder"
                        : ""
                      : "redborder"
                  }
                  value={this.state.poster.bookedAt}
                ></input>
              </div>
              {this.state.updating ? (
                <button onClick={this.onUpdate}>Update</button>
              ) : (
                <button onClick={this.onCreate}>Create</button>
              )}
            </div>
          </div>
        </div>

          <div className="BookingRigthSide">
            {
            this.state.loading ? <Loading/> :
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
              {this.props.booking.booking.map((e, ind) => {
                const d = new Date(Date.parse(e.bookedAt));
                return (
                    <tr key={e.id} className="trT">
                      <th>{ind + 1}</th>
                      <th>{e.personName}</th>
                      <th>{e.roomNumber}</th>
                      <th>{`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`}</th>
                      <th>{e.personId}</th>
                      <th className="Edit"
                          onClick={() => this.onEdit(e, document.getElementById("person"), document.getElementById("room"))}></th>
                      <th
                          className={
                            this.state.updating ? "DeleteDisabled" : "Delete"
                          }
                          onClick={
                            !this.state.updating ? () => this.onDelete(e) : () => {
                            }
                          }
                      ></th>
                    </tr>
                );
              })}
              </tbody>
            </table>
            }
          </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  const { booking, rooms, visitors } = state;
  return {
    booking,
    rooms,
    visitors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBooking: async () => {
      await dispatch(getBookingThunk());
    },
    getVisitors: () => {
      dispatch(getVisitorsThunk());
    },
    getRooms: () => {
      dispatch(getRoomsThunk());
    },
    createBooking: data => {
      dispatch(postBookingThunk(data));
    },
    updateBooking: (data, id) => {
      dispatch(putBookingThunk(data, id));
    },
    deleteBooking: id => {
      dispatch(deleteBookingThunk(id));
    },
    updateRoom: (data, id) => {
      dispatch(putRoomThunk(data, id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
