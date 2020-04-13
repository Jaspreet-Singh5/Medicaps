import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    alert: null,
    res: null,
    error: null
};

const createStudentFeeStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const createStudentFeeSuccess = ( state, action ) => {
    return updateObject( state, {
        res: action.res,
        loading: false,
        alert: 'success'
    } );
};

const createStudentFeeFail = ( state, action ) => {
    return updateObject( state, { loading: false, alert: 'failure', error: action.error } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CREATE_STUDENT_FEE_START: return createStudentFeeStart( state, action );
        case actionTypes.CREATE_STUDENT_FEE_SUCCESS: return createStudentFeeSuccess( state, action );
        case actionTypes.CREATE_STUDENT_FEE_FAIL: return createStudentFeeFail( state, action );
        default: return state;
    }
};

export default reducer;