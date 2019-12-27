import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVisitorsThunk } from '../../thunks'
import './visitors.style.scss'
class Visitors extends Component {

  componentDidMount() {
    this.props.getVisitors()
  }

  componentDidUpdate() {
    console.log('PROPS:', this.props)
  }
  onbut=()=>{
     console.log(this.props.rooms.status)
     
  }
  render() {
    return (
      <div className="Visitors">
      <div className="VisitorsLeftSide">
      <div className="visitorsInput">
        ...
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
    { 
    
      this.props.visitors.visitors.map((e,ind)=>{
        const d = new Date(Date.parse(e.createdDate));
        return (
        <tr key = {e.id}  className="trT">
          <th>{ind+1}</th>
        <th>{e.personName}</th>
        <th>{e.personId}</th>
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
  const { visitors } = state
  return {
    visitors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getVisitors: () => {
      dispatch(getVisitorsThunk())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visitors);