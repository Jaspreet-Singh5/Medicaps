import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    alert: null,
    res: null,
    error: null
};

const createTimetableStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const createTimetableSuccess = ( state, action ) => {
    return updateObject( state, {
        res: action.res,
        loading: false,
        alert: 'success'
    } );
};

const createTimetableFail = ( state, action ) => {
    return updateObject( state, { loading: false, alert: 'failure', error: action.error } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CREATE_TIMETABLE_START: return createTimetableStart( state, action );
        case actionTypes.CREATE_TIMETABLE_SUCCESS: return createTimetableSuccess( state, action );
        case actionTypes.CREATE_TIMETABLE_FAIL: return createTimetableFail( state, action );
        default: return state;
    }
};

export default reducer;