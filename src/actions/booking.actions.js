export const getBookingSuccsess = (data) => ({
    type: 'GET_BOOKING_SUCCSESS',
    payload: data
  })
  
  export const getBookingFailure = () => ({
    type: 'GET_BOOKING_FAILURE'
  })