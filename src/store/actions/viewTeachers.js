import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const fetchTeachersSuccess = ( users ) => {
    return {
        type: actionTypes.FETCH_TEACHERS_SUCCESS,
        users: users
    };
};

export const fetchTeachersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_TEACHERS_FAIL,
        error: error
    };
};

export const fetchTeachersStart = () => {
    return {
        type: actionTypes.FETCH_TEACHERS_START
    };
};

export const fetchTeachers = () => {
    return dispatch => {
        dispatch(fetchTeachersStart());
        axios.get( `/viewTeacher`)
            .then( res => {
                const fetchedTeachers = res.data.teachers;
                
                dispatch(fetchTeachersSuccess(fetchedTeachers));
            } )
            .catch( err => {
                dispatch(fetchTeachersFail(err));
            } );
    };
};