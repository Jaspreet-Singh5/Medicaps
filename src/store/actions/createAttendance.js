import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const createAttendanceSuccess = ( res ) => {
    return {
        type: actionTypes.CREATE_ATTENDANCE_SUCCESS,
        res: res
    };
};

export const createAttendanceFail = ( error ) => {
    return {
        type: actionTypes.CREATE_ATTENDANCE_FAIL,
        error: error
    };
};

export const createAttendanceStart = () => {
    return {
        type: actionTypes.CREATE_ATTENDANCE_START
    };
};

export const createAttendance = (e, form, attendanceCollection) => {

    e.preventDefault();
    
    return dispatch => {
        dispatch(createAttendanceStart());

        attendanceCollection.forEach(attendance => {
            delete attendance.studentName;
            delete attendance.tableData;
        })

        const data = {
          sectionName: form.sectionName.value,
          teacherName: form.teacherName.value,
          date: form.date.value,
          attendanceDetails: attendanceCollection
      }
        
      console.log("data");
        console.log(data);

        axios.post( '/createAttendance', data)
            .then( res => { 
                dispatch(createAttendanceSuccess(res));
            } )
            .catch( err => {
                dispatch(createAttendanceFail(err));
            } );
    };
};