import api from '../API';
import { getBookingSuccsess,getBookingFailure } from '../actions';

export const getBookingThunk = () => async (dispatch) => {
    try {
      
      const response = await api.bookings.get();
      if (response.status !== 200) {
        throw new Error('Cannot get rooms')
      }
      dispatch(getBookingSuccsess(response.data));
    } catch (error) {
      dispatch(getBookingFailure());
    }
  }