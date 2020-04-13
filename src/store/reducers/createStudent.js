import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    alert: null,
    res: null,
    error: null
};

const createStudentStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const createStudentSuccess = ( state, action ) => {
    return updateObject( state, {
        res: action.res,
        loading: false,
        alert: 'success'
    } );
};

const createStudentFail = ( state, action ) => {
    return updateObject( state, { loading: false, alert: 'failure', error: action.error } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CREATE_STUDENT_START: return createStudentStart( state, action );
        case actionTypes.CREATE_STUDENT_SUCCESS: return createStudentSuccess( state, action );
        case actionTypes.CREATE_STUDENT_FAIL: return createStudentFail( state, action );
        default: return state;
    }
};

export default reducer;