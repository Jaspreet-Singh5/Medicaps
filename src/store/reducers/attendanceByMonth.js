import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    attendances: [],
    loading: false
};

const fetchAttendanceByMonthStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const fetchAttendanceByMonthSuccess = ( state, action ) => {
    return updateObject( state, {
        attendances: action.attendances,
        loading: false
    } );
};

const fetchAttendanceByMonthFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_ATTENDANCE_MONTH_STUDENT_START: return fetchAttendanceByMonthStart( state, action );
        case actionTypes.FETCH_ATTENDANCE_MONTH_STUDENT_SUCCESS: return fetchAttendanceByMonthSuccess( state, action );
        case actionTypes.FETCH_ATTENDANCE_MONTH_STUDENT_FAIL: return fetchAttendanceByMonthFail( state, action );
        default: return state;
    }
};

export default reducer;