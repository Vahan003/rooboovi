const initialState = {
    gettingStatus : false,
    getRoomsStatus: false,
    postRoomStatus:true,
    postRoom: "",
    rooms: [],
    status        : {
      rooms: 0,
      booking: 0,
      visitors: 0
    }
  };
  
  export default function roomsReducer(state = initialState, action) {
    switch(action.type) {
      
      case 'GET_STATUS_REQUEST': 
        return {
          ...state,
          gettingStatus: true,
        }
      case 'GET_STATUS_SUCCSESS': 
      return {
        ...state,
        gettingStatus: false,
        status: action.payload
      }
      case 'GET_STATUS_FAILURE': 
      return {
        ...state,
        gettingStatus: false,
      }
      case 'GET_ROOMS_SUCCSESS':
      return {
        ...state,
        getRoomsStatus: true,
        rooms: action.payload
      }
      case 'GET_ROOMS_FAILURE':
      return {
        ...state,
        getRoomsStatus: false,
      }
      case 'POST_ROOM_SUCCSESS':
      return {
        ...state,
        postRoomStatus: true,
        postRoom: action.payload
      }
      case 'POST_ROOM_FAILURE':
      return {
        ...state,
        postRoomStatus: false,
      }
      default:
        return state;
    }
  }