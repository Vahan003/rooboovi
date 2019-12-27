import api from '../API';
import { getVisitorsSuccsess,getVisitorsFailure } from '../actions';

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