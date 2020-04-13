import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    timetable: [],
    loading: false
};

const fetchTimeslotsForTeacherStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const fetchTimeslotsForTeacherSuccess = ( state, action ) => {
    return updateObject( state, {
        timetable: action.timeslots,
        loading: false
    } );
};

const fetchTimeslotsForTeacherFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_TIMESLOTS_TEACHER_START: return fetchTimeslotsForTeacherStart( state, action );
        case actionTypes.FETCH_TIMESLOTS_TEACHER_SUCCESS: return fetchTimeslotsForTeacherSuccess( state, action );
        case actionTypes.FETCH_TIMESLOTS_TEACHER_FAIL: return fetchTimeslotsForTeacherFail( state, action );
        default: return state;
    }
};

export default reducer;