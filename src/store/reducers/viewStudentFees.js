import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    fees: [],
    loading: false
};

const fetchStudentFeesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const fetchStudentFeesSuccess = ( state, action ) => {
    return updateObject( state, {
        fees: action.fees,
        loading: false
    } );
};

const fetchStudentFeesFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_STUDENT_FEE_START: return fetchStudentFeesStart( state, action );
        case actionTypes.FETCH_STUDENT_FEE_SUCCESS: return fetchStudentFeesSuccess( state, action );
        case actionTypes.FETCH_STUDENT_FEE_FAIL: return fetchStudentFeesFail( state, action );
        default: return state;
    }
};

export default reducer;