import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    attendances: [],
    loading: false
};

const fetchAttendanceOfAcademicYearStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const fetchAttendanceOfAcademicYearSuccess = ( state, action ) => {
    return updateObject( state, {
        attendances: action.attendances,
        loading: false
    } );
};

const fetchAttendanceOfAcademicYearFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_ATTENDANCE_ACADEMICYEAR_STUDENT_START: return fetchAttendanceOfAcademicYearStart( state, action );
        case actionTypes.FETCH_ATTENDANCE_ACADEMICYEAR_STUDENT_SUCCESS: return fetchAttendanceOfAcademicYearSuccess( state, action );
        case actionTypes.FETCH_ATTENDANCE_ACADEMICYEAR_STUDENT_FAIL: return fetchAttendanceOfAcademicYearFail( state, action );
        default: return state;
    }
};

export default reducer;