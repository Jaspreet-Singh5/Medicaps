import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    alert: null,
    res: null,
    error: null
};

const createHomeworkStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const createHomeworkSuccess = ( state, action ) => {
    return updateObject( state, {
        res: action.res,
        loading: false,
        alert: 'success'
    } );
};

const createHomeworkFail = ( state, action ) => {
    return updateObject( state, { loading: false, alert: 'failure', error: action.error } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CREATE_HOMEWORK_START: return createHomeworkStart( state, action );
        case actionTypes.CREATE_HOMEWORK_SUCCESS: return createHomeworkSuccess( state, action );
        case actionTypes.CREATE_HOMEWORK_FAIL: return createHomeworkFail( state, action );
        default: return state;
    }
};

export default reducer;