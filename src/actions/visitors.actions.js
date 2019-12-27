export const getVisitorsSuccsess = (data) => ({
    type: 'GET_VISITORS_SUCCSESS',
    payload: data
  })
  
  export const getVisitorsFailure = () => ({
    type: 'GET_VISITORS_FAILURE'
  })