import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    homeworks: [],
    loading: false
};

const fetchSubjectsHomeWorkForStudentsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
    
const fetchSubjectsHomeWorkForStudentsSuccess = ( state, action ) => {
    return updateObject( state, {
        homeworks: action.homeworks,
        loading: false
    } );
};

const fetchSubjectsHomeWorkForStudentsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_SUBJECTS_HOMEWORK_STUDENTS_START: return fetchSubjectsHomeWorkForStudentsStart( state, action );
        case actionTypes.FETCH_SUBJECTS_HOMEWORK_STUDENTS_SUCCESS: return fetchSubjectsHomeWorkForStudentsSuccess( state, action );
        case actionTypes.FETCH_SUBJECTS_HOMEWORK_STUDENTS_FAIL: return fetchSubjectsHomeWorkForStudentsFail( state, action );
        default: return state;
    }
};

export default reducer;