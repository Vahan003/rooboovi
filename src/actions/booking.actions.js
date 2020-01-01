export const getBookingSuccsess = (data) => ({
    type: 'GET_BOOKING_SUCCSESS',
    payload: data
  })
  
  export const getBookingFailure = () => ({
    type: 'GET_BOOKING_FAILURE'
  })
  export const postBookingSuccsess = (data) => ({
    type: 'POST_BOOKING_SUCCSESS',
    payload: data
  })
  
  export const postBookingFailure = () => ({
    type: 'POST_BOOKING_FAILURE'
  })