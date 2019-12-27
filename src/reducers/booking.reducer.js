const initialState = {
    getBookingStatus: false,
    booking: []
  };
  
  export default function bookingReducer(state = initialState, action) {
    switch(action.type) {
      case 'GET_BOOKING_SUCCSESS':
      return {
        ...state,
        getBookingStatus: true,
        booking: action.payload
      }
      case 'GET_BOOKING_FAILURE':
      return {
        ...state,
        getBookingStatus: false,
      }
      default:
        return state;
    }
  }