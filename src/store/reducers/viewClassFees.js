import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    fees: [],
    loading: false
};

const fetchClassFeesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const fetchClassFeesSuccess = ( state, action ) => {
    return updateObject( state, {
        fees: action.fees,
        loading: false
    } );
};

const fetchClassFeesFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_CLASS_FEE_START: return fetchClassFeesStart( state, action );
        case actionTypes.FETCH_CLASS_FEE_SUCCESS: return fetchClassFeesSuccess( state, action );
        case actionTypes.FETCH_CLASS_FEE_FAIL: return fetchClassFeesFail( state, action );
        default: return state;
    }
};

export default reducer;