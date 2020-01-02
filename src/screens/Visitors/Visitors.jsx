import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getVisitorsThunk,
  postVisitorsThunk,
  putVisitorsThunk,
  deleteVisitorsThunk
} from "../../thunks";
import "./visitors.style.scss";
class Visitors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      updating: false,
      ID: "",
      poster: {
        personName: "",
        personId: "",
        cardNumber: "",
        createdDate: ""
      }
    };
  }
  checkEmtyInputs = () => {
    if (
      this.state.poster.personName !== "" &&
      this.state.poster.personId !== "" &&
      this.state.poster.cardNumber !== "" &&
      this.state.poster.createdDate !== ""
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
        personId: "",
        cardNumber: "",
        createdDate: ""
      }
    });
  };

  componentDidMount() {
    this.props.getVisitors();
  }

  componentDidUpdate(PrevProps) {
    // console.log("DID_UPDATE",this.props, "STATE__>",this.state)
    if (this.props.visitors.postVisitors !== PrevProps.visitors.postVisitors) {
      this.props.getVisitors();
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
  onEdit = elem => {
    this.setState({
      updating: true,
      ID: elem.id,
      poster: {
        ...this.state.poster,
        personName: elem.personName,
        personId: elem.personId,
        cardNumber: elem.cardNumber,
        createdDate: elem.createdDate
      }
    });
  };
  onDelete = elem => {
    this.props.deleteVisitors(elem.id);
  };
  onCreate = () => {
    if (this.checkEmtyInputs()) {
      this.props.createVisitors(this.state.poster);
    }
  };
  onUpdate = () => {
    if (this.checkEmtyInputs()) {
      this.props.updateVisitors(this.state.poster, this.state.ID);
      setTimeout(() => {
        if (this.props.visitors.postVisitorsStatus) {
          this.emtyInputs();

          this.setState({
            updating: false
          });
        } else {
          this.setState({
            updating: true
          });
        }
      }, 1000);
    } else {
      this.setState({
        updating: true
      });
    }
  };
  render() {
    return (
      <div className="Visitors">
        <div className="VisitorsLeftSide">
          <div className="visitorsInput">
            <div className="inpSection">
              Add New Person
              <div className="inp">
                Person Name
                <input
                  name="personName"
                  onChange={this.getInp}
                  className={
                    this.state.checked && this.props.visitors.postVisitorsStatus
                      ? this.state.updating
                        ? "greenborder"
                        : ""
                      : "redborder"
                  }
                  value={this.state.poster.personName}
                ></input>
              </div>
              <div className="inp">
                Person ID
                <input
                  name="personId"
                  onChange={this.getInp}
                  className={
                    this.state.checked && this.props.visitors.postVisitorsStatus
                      ? this.state.updating
                        ? "greenborder"
                        : ""
                      : "redborder"
                  }
                  value={this.state.poster.personId}
                ></input>
              </div>
              <div className="inp">
                Card Number
                <input
                  name="cardNumber"
                  onChange={this.getInp}
                  className={
                    this.state.checked && this.props.visitors.postVisitorsStatus
                      ? this.state.updating
                        ? "greenborder"
                        : ""
                      : "redborder"
                  }
                  value={this.state.poster.cardNumber}
                ></input>
              </div>
              <div className="inp">
                Date
                <input
                  type="date"
                  name="createdDate"
                  onChange={this.getInp}
                  className={
                    this.state.checked && this.props.visitors.postVisitorsStatus
                      ? this.state.updating
                        ? "greenborder"
                        : ""
                      : "redborder"
                  }
                  value={this.state.poster.createdDate}
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
        <div className="VisitorsRigthSide">
          <table>
            <thead className="theadT">
              <tr className="trH">
                <th>#ID</th>
                <th>Person Name</th>
                <th>Person ID</th>
                <th>Date</th>
                <th>Card Number</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="tbodyT">
              {this.props.visitors.visitors.map((e, ind) => {
                const d = new Date(Date.parse(e.createdDate));
                return (
                  <tr key={e.id} className="trT">
                    <th>{ind + 1}</th>
                    <th>{e.personName}</th>
                    <th>{e.personId}</th>
                    <th>{`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`}</th>
                    <th>{e.cardNumber}</th>
                    <th className="Edit" onClick={() => this.onEdit(e)}></th>
                    <th
                      className={
                        this.state.updating ? "DeleteDisabled" : "Delete"
                      }
                      onClick={
                        !this.state.updating ? () => this.onDelete(e) : () => {}
                      }
                    ></th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { visitors } = state;
  return {
    visitors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getVisitors: () => {
      dispatch(getVisitorsThunk());
    },
    createVisitors: data => {
      dispatch(postVisitorsThunk(data));
    },
    updateVisitors: (data, id) => {
      dispatch(putVisitorsThunk(data, id));
    },
    deleteVisitors: id => {
      dispatch(deleteVisitorsThunk(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Visitors);
