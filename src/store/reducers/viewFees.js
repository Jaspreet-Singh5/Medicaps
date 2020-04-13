import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    fees: [],
    loading: false
};

const fetchFeesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const fetchFeesSuccess = ( state, action ) => {
    return updateObject( state, {
        fees: action.fees,
        loading: false
    } );
};

const fetchFeesFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_FEE_START: return fetchFeesStart( state, action );
        case actionTypes.FETCH_FEE_SUCCESS: return fetchFeesSuccess( state, action );
        case actionTypes.FETCH_FEE_FAIL: return fetchFeesFail( state, action );
        default: return state;
    }
};

export default reducer;