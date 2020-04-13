import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    timetable: [],
    loading: false
};

const fetchTimeslotsForStudentsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const fetchTimeslotsForStudentsSuccess = ( state, action ) => {
    return updateObject( state, {
        timetable: action.timeslots,
        loading: false
    } );
};

const fetchTimeslotsForStudentsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_TIMESLOTS_STUDENTS_START: return fetchTimeslotsForStudentsStart( state, action );
        case actionTypes.FETCH_TIMESLOTS_STUDENTS_SUCCESS: return fetchTimeslotsForStudentsSuccess( state, action );
        case actionTypes.FETCH_TIMESLOTS_STUDENTS_FAIL: return fetchTimeslotsForStudentsFail( state, action );
        default: return state;
    }
};

export default reducer;