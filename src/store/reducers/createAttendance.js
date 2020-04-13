import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    alert: null,
    res: null,
    error: null
};

const createAttendanceStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const createAttendanceSuccess = ( state, action ) => {
    return updateObject( state, {
        res: action.res,
        loading: false,
        alert: 'success'
    } );
};

const createAttendanceFail = ( state, action ) => {
    return updateObject( state, { loading: false, alert: 'failure', error: action.error } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CREATE_ATTENDANCE_START: return createAttendanceStart( state, action );
        case actionTypes.CREATE_ATTENDANCE_SUCCESS: return createAttendanceSuccess( state, action );
        case actionTypes.CREATE_ATTENDANCE_FAIL: return createAttendanceFail( state, action );
        default: return state;
    }
};

export default reducer;