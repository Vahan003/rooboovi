export const getVisitorsSuccsess = (data) => ({
    type: 'GET_VISITORS_SUCCSESS',
    payload: data
  })
  
  export const getVisitorsFailure = () => ({
    type: 'GET_VISITORS_FAILURE'
  })

  export const postVisitorsSuccsess = (data) => ({
    type: 'POST_VISITORS_SUCCSESS',
    payload: data
  })
  
  export const postVisitorsFailure = () => ({
    type: 'POST_VISITORS_FAILURE'
  })