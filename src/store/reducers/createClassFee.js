import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    alert: null,
    res: null,
    error: null
};

const createClassFeeStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const createClassFeeSuccess = ( state, action ) => {
    return updateObject( state, {
        res: action.res,
        loading: false,
        alert: 'success'
    } );
};

const createClassFeeFail = ( state, action ) => {
    return updateObject( state, { loading: false, alert: 'failure', error: action.error } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CREATE_CLASS_FEE_START: return createClassFeeStart( state, action );
        case actionTypes.CREATE_CLASS_FEE_SUCCESS: return createClassFeeSuccess( state, action );
        case actionTypes.CREATE_CLASS_FEE_FAIL: return createClassFeeFail( state, action );
        default: return state;
    }
};

export default reducer;