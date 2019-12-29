export const getStatusRequest = () => ({
  type: 'GET_STATUS_REQUEST'
})

export const getStatusSuccsess = (data) => ({
  type: 'GET_STATUS_SUCCSESS',
  payload: data
})

export const getStatusFailure = () => ({
  type: 'GET_STATUS_FAILURE'
})

export const getRoomsSuccsess = (data) => ({
  type: 'GET_ROOMS_SUCCSESS',
  payload: data
})

export const getRoomsFailure = () => ({
  type: 'GET_ROOMS_FAILURE'
})

export const postRoomSuccsess = (data) => ({
  type: 'POST_ROOM_SUCCSESS',
  payload: data
})

export const postRoomFailure = () => ({
  type: 'POST_ROOM_FAILURE'
})