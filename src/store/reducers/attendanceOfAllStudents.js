import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    attendances: [],
    loading: false
};

const fetchAttendanceOfAllStudentsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const fetchAttendanceOfAllStudentsSuccess = ( state, action ) => {
    return updateObject( state, {
        attendances: action.attendances,
        loading: false
    } );
};

const fetchAttendanceOfAllStudentsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_ATTENDANCE_ALL_STUDENTS_START: return fetchAttendanceOfAllStudentsStart( state, action );
        case actionTypes.FETCH_ATTENDANCE_ALL_STUDENTS_SUCCESS: return fetchAttendanceOfAllStudentsSuccess( state, action );
        case actionTypes.FETCH_ATTENDANCE_ALL_STUDENTS_FAIL: return fetchAttendanceOfAllStudentsFail( state, action );
        default: return state;
    }
};

export default reducer;