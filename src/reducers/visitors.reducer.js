const initialState = {
    getVisitorsStatus: false,
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
      default:
        return state;
    }
  }