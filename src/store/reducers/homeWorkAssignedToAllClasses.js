import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    homeworks: [],
    loading: false
};

const fetchHomeWorkAssignedToAllClassesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const fetchHomeWorkAssignedToAllClassesSuccess = ( state, action ) => {
    return updateObject( state, {
        homeworks: action.homeworks,
        loading: false
    } );
};

const fetchHomeWorkAssignedToAllClassesFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_HOMEWORK_ASSIGNED_ALLCLASSES_START: return fetchHomeWorkAssignedToAllClassesStart( state, action );
        case actionTypes.FETCH_HOMEWORK_ASSIGNED_ALLCLASSES_SUCCESS: return fetchHomeWorkAssignedToAllClassesSuccess( state, action );
        case actionTypes.FETCH_SUBJECTS_HOMEWORK_STUDENTS_FAIL: return fetchHomeWorkAssignedToAllClassesFail( state, action );
        default: return state;
    }
};

export default reducer;