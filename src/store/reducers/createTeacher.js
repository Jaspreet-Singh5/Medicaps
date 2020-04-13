import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    alert: null,
    res: null,
    error: null
};

const createTeacherStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const createTeacherSuccess = ( state, action ) => {
    return updateObject( state, {
        res: action.res,
        loading: false,
        alert: 'success'
    } );
};

const createTeacherFail = ( state, action ) => {
    return updateObject( state, { loading: false, alert: 'failure', error: action.error } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CREATE_TEACHER_START: return createTeacherStart( state, action );
        case actionTypes.CREATE_TEACHER_SUCCESS: return createTeacherSuccess( state, action );
        case actionTypes.CREATE_TEACHER_FAIL: return createTeacherFail( state, action );
        default: return state;
    }
};

export default reducer;