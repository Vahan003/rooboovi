import api from '../API';
import { getStatusRequest, getStatusSuccsess, getStatusFailure,getRoomsSuccsess,getRoomsFailure,postRoomFailure,postRoomSuccsess } from '../actions';

export const getStatusThunk = () => async (dispatch) => {
  try {
    dispatch(getStatusRequest());
    const response = await api.roomsStatus.get();
    if (response.status !== 200) {
      throw new Error('Cannot get status')
    }
    dispatch(getStatusSuccsess(response.data.status));
  } catch (error) {
    dispatch(getStatusFailure());
  }
}

export const getRoomsThunk = () => async (dispatch) => {
  try {
    
    const response = await api.rooms.get();
    if (response.status !== 200) {
      throw new Error('Cannot get rooms')
    }
    dispatch(getRoomsSuccsess(response.data));
  } catch (error) {
    dispatch(getRoomsFailure());
  }
}

export const postRoomThunk = (data) => async (dispatch) => {
  try {
    
    const response = await api.rooms.post(data);
    if (response.status !== 200) {
      throw new Error('Cannot post room')
    }
    dispatch(postRoomSuccsess(response));
  } catch (error) {
    dispatch(postRoomFailure());
  }
}
export const putRoomThunk = (data,id) => async (dispatch) => {
  try {
  
    const response = await api.putRoom(id).put(data);
    
    if (response.status !== 200) {
      throw new Error('Cannot post room')
    }
    dispatch(postRoomSuccsess(response));
  } catch (error) {
    dispatch(postRoomFailure());
  }
}

export const deleteRoomThunk = (id) => async (dispatch) => {
  try {
  
    const response = await api.putRoom(id).delete();
    
    if (response.status !== 200) {
      throw new Error('Cannot post room')
    }
    dispatch(postRoomSuccsess(response));
  
  } catch (error) {
    dispatch(postRoomFailure());
  }
}