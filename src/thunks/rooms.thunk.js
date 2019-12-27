import api from '../API';
import { getStatusRequest, getStatusSuccsess, getStatusFailure,getRoomsSuccsess,getRoomsFailure } from '../actions';

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