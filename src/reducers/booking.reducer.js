const initialState = {
    getBookingStatus: false,
    postBookingStatus: true,
    postBooking: "",
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
      case 'POST_BOOKING_SUCCSESS':
      return {
        ...state,
        postBookingStatus: true,
        postBooking: action.payload
      }
      case 'POST_BOOKING_FAILURE':
      return {
        ...state,
        postBookingStatus: false
      }
      default:
        return state;
    }
  }