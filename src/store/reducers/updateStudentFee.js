import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    alert: null,
    res: null,
    error: null
};

const updateStudentFeeStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const updateStudentFeeSuccess = ( state, action ) => {
    return updateObject( state, {
        res: action.res,
        loading: false,
        alert: 'success'
    } );
};

const updateStudentFeeFail = ( state, action ) => {
    return updateObject( state, { loading: false, alert: 'failure', error: action.error } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.UPDATE_STUDENT_FEE_START: return updateStudentFeeStart( state, action );
        case actionTypes.UPDATE_STUDENT_FEE_SUCCESS: return updateStudentFeeSuccess( state, action );
        case actionTypes.UPDATE_STUDENT_FEE_FAIL: return updateStudentFeeFail( state, action );
        default: return state;
    }
};

export default reducer;