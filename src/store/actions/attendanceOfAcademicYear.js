import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const fetchAttendanceOfAcademicYearSuccess = (attendances) => {
    return {
        type: actionTypes.FETCH_ATTENDANCE_ACADEMICYEAR_STUDENT_SUCCESS,
        attendances: attendances
    };
};

export const fetchAttendanceOfAcademicYearFail = (error) => {
    return {
        type: actionTypes.FETCH_ATTENDANCE_ACADEMICYEAR_STUDENT_FAIL,
        error: error
    };
};

export const fetchAttendanceOfAcademicYearStart = () => {
    return {
        type: actionTypes.FETCH_ATTENDANCE_ACADEMICYEAR_STUDENT_START
    };
};

export const fetchAttendanceOfAcademicYear = (sid, academicYear) => {
    return dispatch => {
        dispatch(fetchAttendanceOfAcademicYearStart());
        axios.get(`/viewAttendanceOfAcademicYear/${sid}/${academicYear}`)
            .then(res => {
                const fetchedAttendanceOfAcademicYear = res.data;

        dispatch(fetchAttendanceOfAcademicYearSuccess(fetchedAttendanceOfAcademicYear));
    } )
            .catch (err => {
    dispatch(fetchAttendanceOfAcademicYearFail(err));
} );
    };
};