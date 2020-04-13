import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';

import timetableForTeacherReducer from './store/reducers/timetableForTeacher';
import timetableForStudentsReducer from './store/reducers/timetableForStudents';
import subjectsHomeWorkForStudentsReducer from './store/reducers/subjectsHomeWorkForStudents';
import homeWorkAssignedToAllClassesReducer from './store/reducers/homeWorkAssignedToAllClasses';
import createTimetableReducer from './store/reducers/createTimetable';
import createHomeworkReducer from './store/reducers/createHomework';
import createTeacherReducer from './store/reducers/createTeacher';
import createStudentReducer from './store/reducers/createStudent';
import createSectionReducer from './store/reducers/createSection';
import viewTeachersReducer from './store/reducers/viewTeachers';
import viewStudentsReducer from './store/reducers/viewStudents';
import viewSectionsReducer from './store/reducers/viewSections';
import attendanceOfAllStudentsReducer from './store/reducers/attendanceOfAllStudents';
import attendanceOfAcademicYearReducer from './store/reducers/attendanceOfAcademicYear';
import attendanceByMonthReducer from './store/reducers/attendanceByMonth';
import createAttendanceReducer from './store/reducers/createAttendance';
import createFeeReducer from './store/reducers/createFee';
import viewFeesReducer from './store/reducers/viewFees';
import createClassFeeReducer from './store/reducers/createClassFee';
import viewClassFeesReducer from './store/reducers/viewClassFees';
import createStudentFeeReducer from './store/reducers/createStudentFee';
import viewStudentFeesReducer from './store/reducers/viewStudentFees';
import updateStudentFeeReducer from './store/reducers/updateStudentFee';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    timetableForTeacher: timetableForTeacherReducer,
    timetableForStudents: timetableForStudentsReducer,
    subjectsHomeWorkForStudents: subjectsHomeWorkForStudentsReducer,
    homeWorkAssignedToAllClasses: homeWorkAssignedToAllClassesReducer,
    createTimetable: createTimetableReducer,
    createHomework: createHomeworkReducer,
    createTeacher: createTeacherReducer,
    createStudent: createStudentReducer,
    createSection: createSectionReducer,
    viewTeachers: viewTeachersReducer,
    viewStudents: viewStudentsReducer,
    viewSections: viewSectionsReducer,
    attendanceOfAllStudents: attendanceOfAllStudentsReducer,
    attendanceOfAcademicYear: attendanceOfAcademicYearReducer,
    attendanceByMonth: attendanceByMonthReducer,
    createAttendance: createAttendanceReducer,
    createFee: createFeeReducer,
    viewFees: viewFeesReducer,
    createClassFee: createClassFeeReducer,
    viewClassFees: viewClassFeesReducer,
    createStudentFee: createStudentFeeReducer,
    viewStudentFees: viewStudentFeesReducer,
    updateStudentFee: updateStudentFeeReducer,
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
