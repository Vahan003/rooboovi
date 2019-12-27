import {combineReducers} from 'redux'
import roomsReducer from './rooms.reducer'
import bookingReducer from './booking.reducer'
import visitorsReducer from './visitors.reducer'


export default combineReducers({
    rooms: roomsReducer,
    booking: bookingReducer,
    visitors: visitorsReducer
})