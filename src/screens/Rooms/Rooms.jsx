import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  getStatusThunk,
  getRoomsThunk,
  postRoomThunk,
  putRoomThunk,
  deleteRoomThunk
} from "../../thunks";
import "./rooms.style.scss";
import Loading from "../../components/Loading";
class Rooms extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      updating: false,
      deleted: false,
      ID: "",
      loading: true,
      poster: {
        bookedAt: null,
        floor: "",
        beds: "",
        balcony: "",
        roomId: "",
        available: false,
      }
    };
  }
  getStatus_RoomsAsync = async () =>{
    await this.props.getStatus();
    await this.props.getRooms();
    this.setState({
      loading: false
    })
  }

  componentDidMount() {
    this.getStatus_RoomsAsync()
  }
  componentDidUpdate(PrevProps) {
    if(this.props.rooms.postRoom.data !== PrevProps.rooms.postRoom.data){
      this.setState({
        loading: true
      })
      this.getStatus_RoomsAsync()
    }
  }

  checkEmtyInputs = () => {
    if (
      this.state.poster.floor !== "" &&
      this.state.poster.beds !== "" &&
      this.state.poster.balcony !== "" &&
      this.state.poster.roomId !== ""
    ){
      this.setState({
       checked: true
      })
      return true;
    }
    else {
      this.setState({
        checked: false
       })
      return false;
    }
  };
  emtyInputs = () => {
    this.setState({
      poster: {
        ...this.state.poster,
        floor: "",
        beds: "",
        balcony: "",
        roomId: ""
      }
    });
  };
  onEdit = elem => {
    this.setState({
      updating: true,
      ID: elem.id,
      poster: {
        bookedAt: elem.bookedAt,
        floor: elem.floor,
        beds: elem.beds,
        balcony: elem.balcony,
        roomId: elem.roomId
      }
    });
  };
  onDelete = elem => {
   this.props.deleteRoom(elem.id);
    
  };
  onCreate = () => {
    if (this.checkEmtyInputs()) {
      this.props.createRoom(this.state.poster);
    }
  }
  onUpdate = () => {
    if (this.checkEmtyInputs()) {
    this.props.updateRoom(this.state.poster, this.state.ID)
        setTimeout(()=>{

         if(this.props.rooms.postRoomStatus){
          this.emtyInputs();
      
        this.setState({
          updating: false
        });
       
      } else{
        this.setState({
          updating: true
        })
      }
    },1000)
  }
    else{
      this.setState({
        updating: true
      });
    }
   
  };
  getInp = e => {
    this.setState({
      poster: {
        ...this.state.poster,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    return (
      <div className="Rooms">
        <div className="RoomsLeftSide">

            <div className="amountAll">
              {
              this.state.loading ? <Loading/> :
              <div className="amountAllIn">
              <div className="amount">
                {this.props.rooms.status.rooms
                    ? this.props.rooms.status.rooms
                    : "-"}
                <div className="amountText">Rooms</div>
              </div>
              <div className="amount">
                {this.props.rooms.status.booking
                    ? this.props.rooms.status.booking
                    : "-"}
                <div className="amountText">Booking</div>
              </div>
              <div className="amount">
                {this.props.rooms.status.visitors
                    ? this.props.rooms.status.visitors
                    : "-"}
                <div className="amountText">Visitors</div>
              </div>
              </div>
              }
            </div>

          <div className="roomsInput">
            <div className="inpSection">
              Add New Room
              <div className="inp">
                Floor
                <input
                  name="floor"
                  onChange={this.getInp}
                  className={this.state.checked && this.props.rooms.postRoomStatus  ? (this.state.updating? "greenborder": "") : "redborder"}
                  value={this.state.poster.floor}
                ></input>
              </div>
              <div className="inp">
                Beds
                <input
                  name="beds"
                  onChange={this.getInp}
                  className={this.state.checked &&this.props.rooms.postRoomStatus ? (this.state.updating? "greenborder": "") : "redborder"}
                  value={this.state.poster.beds}
                ></input>
              </div>
              <div className="inp">
                Balcony
                <select
                  name="balcony"

                  onChange={this.getInp}
                  className={this.state.checked &&this.props.rooms.postRoomStatus ? (this.state.updating? "greenborder": "") : "redborder"}
                  value={this.state.poster.balcony}
                > 
                <option value="" defaultValue disabled hidden>Choose</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="inp">
                Room Number
                <input
                  name="roomId"
                  onChange={this.getInp}
                  className={this.state.checked &&this.props.rooms.postRoomStatus ? (this.state.updating? "greenborder": "") : "redborder"}
                  value={this.state.poster.roomId}
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

          <div className="RoomsRigthSide">
            {
            this.state.loading ? <Loading/> :
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
              {this.props.rooms.rooms.map((e, ind) => {
                const d = new Date(Date.parse(e.bookedAt));
                return (
                    <tr key={e.id} className="trT">
                      <th>{ind + 1}</th>
                      <th>{`${d.getDate() || "--"}/${d.getMonth() + 1 || "--"}/${d.getFullYear() || "----"}`}</th>
                      <th className={e.floor > 0 ? "" : "thRed"}>{e.floor}</th>
                      <th className={e.beds > 0 ? "" : "thRed"}>{e.beds}</th>
                      <th className={e.balcony ? "thGreen" : "thRed"}>
                        {e.balcony ? "Yes" : "No"}{" "}
                      </th>
                      <th className={e.roomId > 0 ? "" : "thRed"}>{e.roomId}</th>
                      <th className="Edit" onClick={() => this.onEdit(e)}></th>
                      <th
                          className={this.state.updating ? "DeleteDisabled" : "Delete"}
                          onClick={!this.state.updating ? () => this.onDelete(e) : () => {
                          }}
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
  const { rooms } = state;
  return {
    rooms
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStatus: async () => {
      await dispatch(getStatusThunk());
    },
    getRooms: async () => {
      await dispatch(getRoomsThunk());
    },
    createRoom: data => {
      dispatch(postRoomThunk(data));
    },
    updateRoom: (data, id) => {
      dispatch(putRoomThunk(data, id));
    },
    deleteRoom: id => {
      dispatch(deleteRoomThunk(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
