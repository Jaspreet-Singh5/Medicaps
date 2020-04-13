import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    alert: null,
    res: null,
    error: null
};

const createFeeStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const createFeeSuccess = ( state, action ) => {
    return updateObject( state, {
        res: action.res,
        loading: false,
        alert: 'success'
    } );
};

const createFeeFail = ( state, action ) => {
    return updateObject( state, { loading: false, alert: 'failure', error: action.error } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CREATE_FEE_START: return createFeeStart( state, action );
        case actionTypes.CREATE_FEE_SUCCESS: return createFeeSuccess( state, action );
        case actionTypes.CREATE_FEE_FAIL: return createFeeFail( state, action );
        default: return state;
    }
};

export default reducer;