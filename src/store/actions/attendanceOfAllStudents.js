import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const fetchAttendanceOfAllStudentsSuccess = ( attendances ) => {
    return {
        type: actionTypes.FETCH_ATTENDANCE_ALL_STUDENTS_SUCCESS,
        attendances: attendances
    };
};

export const fetchAttendanceOfAllStudentsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ATTENDANCE_ALL_STUDENTS_FAIL,
        error: error
    };
};

export const fetchAttendanceOfAllStudentsStart = () => {
    return {
        type: actionTypes.FETCH_ATTENDANCE_ALL_STUDENTS_START
    };
};

export const fetchAttendanceOfAllStudents = (secid, month, academicYear) => {
    return dispatch => {
        dispatch(fetchAttendanceOfAllStudentsStart());
        axios.get( `/viewSectionAttendance/${secid}/${month}/${academicYear}`)
            .then( res => {
                const fetchedAttendanceOfAllStudents = res.data;
                
                dispatch(fetchAttendanceOfAllStudentsSuccess(fetchedAttendanceOfAllStudents));
            } )
            .catch( err => {
                dispatch(fetchAttendanceOfAllStudentsFail(err));
            } );
    };
};