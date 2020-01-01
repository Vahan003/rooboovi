import api from '../API';
import { getVisitorsSuccsess,getVisitorsFailure,postVisitorsSuccsess,postVisitorsFailure } from '../actions';

export const getVisitorsThunk = () => async (dispatch) => {
    try {
      
      const response = await api.visitors.get();
      if (response.status !== 200) {
        throw new Error('Cannot get rooms')
      }
      dispatch(getVisitorsSuccsess(response.data));
    } catch (error) {
      dispatch(getVisitorsFailure());
    }
  }

  export const postVisitorsThunk = (data) => async (dispatch) => {
    try {
      
      const response = await api.visitors.post(data);
      if (response.status !== 200) {
        throw new Error('Cannot post room')
      }
      dispatch(postVisitorsSuccsess(response));
    } catch (error) {
      dispatch(postVisitorsFailure());
    }
  }
  export const putVisitorsThunk = (data,id) => async (dispatch) => {
    try {
      
      const response = await api.putVisitors(id).put(data);
      if (response.status !== 200) {
        throw new Error('Cannot post room')
      }
      dispatch(postVisitorsSuccsess(response));
    } catch (error) {
      dispatch(postVisitorsFailure());
    }
  }
  
  export const deleteVisitorsThunk = (id) => async (dispatch) => {
    try {
    
      const response = await api.putVisitors(id).delete();
      
      if (response.status !== 200) {
        throw new Error('Cannot post room')
      }
      dispatch(postVisitorsSuccsess(response));
    
    } catch (error) {
      dispatch(postVisitorsFailure());
    }
  }