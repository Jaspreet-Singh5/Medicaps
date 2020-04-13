import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    users: [],
    loading: false
};

const fetchTeachersStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const fetchTeachersSuccess = ( state, action ) => {
    return updateObject( state, {
        users: action.users,
        loading: false
    } );
};

const fetchTeachersFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_TEACHERS_START: return fetchTeachersStart( state, action );
        case actionTypes.FETCH_TEACHERS_SUCCESS: return fetchTeachersSuccess( state, action );
        case actionTypes.FETCH_TEACHERS_FAIL: return fetchTeachersFail( state, action );
        default: return state;
    }
};

export default reducer;