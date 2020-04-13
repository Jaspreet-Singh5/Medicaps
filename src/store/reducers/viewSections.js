import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    users: [],
    loading: false
};

const fetchSectionsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const fetchSectionsSuccess = ( state, action ) => {
    return updateObject( state, {
        users: action.users,
        loading: false
    } );
};

const fetchSectionsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_SECTIONS_START: return fetchSectionsStart( state, action );
        case actionTypes.FETCH_SECTIONS_SUCCESS: return fetchSectionsSuccess( state, action );
        case actionTypes.FETCH_SECTIONS_FAIL: return fetchSectionsFail( state, action );
        default: return state;
    }
};

export default reducer;