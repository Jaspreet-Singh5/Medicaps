import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const fetchStudentsSuccess = ( users ) => {
    return {
        type: actionTypes.FETCH_STUDENTS_SUCCESS,
        users: users
    };
};

export const fetchStudentsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_STUDENTS_FAIL,
        error: error
    };
};

export const fetchStudentsStart = () => {
    return {
        type: actionTypes.FETCH_STUDENTS_START
    };
};

export const fetchStudents = (query = {}) => {
    return dispatch => {
        dispatch(fetchStudentsStart());
        axios.get( `/viewStudent`)
            .then( res => {
                console.log(res);
                const fetchedStudents = res.data.students;
                
                dispatch(fetchStudentsSuccess(fetchedStudents));
            } )
            .catch( err => {
                dispatch(fetchStudentsFail(err));
            } );
    };
};