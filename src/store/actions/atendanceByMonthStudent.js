import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const fetchAttendanceByMonthStudentSuccess = (attendances) => {
    return {
        type: actionTypes.FETCH_ATTENDANCE_MONTH_STUDENT_SUCCESS,
        attendances: attendances
    };
};

export const fetchAttendanceByMonthStudentFail = (error) => {
    return {
        type: actionTypes.FETCH_ATTENDANCE_MONTH_STUDENT_FAIL,
        error: error
    };
};

export const fetchAttendanceByMonthStudentStart = () => {
    return {
        type: actionTypes.FETCH_ATTENDANCE_MONTH_STUDENT_START
    };
};

export const fetchAttendanceByMonthStudent = (sid, academicYear) => {
    return dispatch => {
        dispatch(fetchAttendanceByMonthStudentStart());

        axios.get(`/viewAttendanceOfAcademicYear/${sid}/${academicYear}`)
            .then(res => {
                const fetchedAttendanceByMonthStudent = res.data;
            
        dispatch(fetchAttendanceByMonthStudentSuccess(fetchedAttendanceByMonthStudent));
    } )
            .catch (err => {
    dispatch(fetchAttendanceByMonthStudentFail(err));
} );
    };
};