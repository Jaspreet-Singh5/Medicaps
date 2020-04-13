import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    alert: null,
    res: null,
    error: null
};

const createSectionStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const createSectionSuccess = ( state, action ) => {
    return updateObject( state, {
        res: action.res,
        loading: false,
        alert: 'success'
    } );
};

const createSectionFail = ( state, action ) => {
    return updateObject( state, { loading: false, alert: 'failure', error: action.error } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CREATE_SECTION_START: return createSectionStart( state, action );
        case actionTypes.CREATE_SECTION_SUCCESS: return createSectionSuccess( state, action );
        case actionTypes.CREATE_SECTION_FAIL: return createSectionFail( state, action );
        default: return state;
    }
};

export default reducer;