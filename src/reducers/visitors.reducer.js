const initialState = {
    getVisitorsStatus: false,
    postVisitorsStatus: true,
    postVisitors: "",
    visitors: []
  };
  
  export default function visitorsReducer(state = initialState, action) {
    switch(action.type) {
      case 'GET_VISITORS_SUCCSESS':
      return {
        ...state,
        getVisitorsStatus: true,
        visitors: action.payload
      }
      case 'GET_VISITORS_FAILURE':
      return {
        ...state,
        getVisitorsStatus: false,
      }
      case 'POST_VISITORS_SUCCSESS':
        return {
          ...state,
          postVisitorsStatus: true,
          postVisitors: action.payload
        }
        case 'POST_VISITORS_FAILURE':
        return {
          ...state,
          postVisitorsStatus: false
        }
        default:
        return state;
    }
  }