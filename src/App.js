import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import ViewTimetableForTeacher from './containers/ViewTimetableForTeacher/ViewTimetableForTeacher';
import ViewTimetableForStudents from './containers/ViewTimetableForStudents/ViewTimetableForStudents';
import ViewAllSubjectsHomeWork from './containers/ViewAllSubjectsHomeWork/ViewAllSubjectsHomeWork';
import ViewHomeWorkAssignedToAllClasses from './containers/ViewHomeWorkAssignedToAllClasses/ViewHomeWorkAssignedToAllClasses';
import CreateTimetable from './containers/CreateTimetable/CreateTimetable';
import CreateHomework from './containers/CreateHomework/CreateHomework';
import CreateTeacher from './containers/CreateTeacher/CreateTeacher';
import CreateStudent from './containers/CreateStudent/CreateStudent';
import CreateSection from './containers/CreateSection/CreateSection';
import ViewTeachers from './containers/ViewTeachers/ViewTeachers';
import ViewStudents from './containers/ViewStudents/ViewStudents';
import ViewSections from './containers/ViewSections/ViewSections';
import ViewAttendanceOfAllStudents from './containers/ViewAttendanceOfAllStudents/ViewAttendanceOfAllStudents';
import ViewAttendanceOfAcademicYear from './containers/ViewAttendanceOfAcademicYear/ViewAttendanceOfAcademicYear';
import ViewAttendanceByMonth from './containers/ViewAttendanceByMonth/ViewAttendanceByMonth';
import CreateAttendance from './containers/CreateAttendance/CreateAttendance';
import CreateFee from './containers/CreateFee/CreateFee';
import ViewFee from './containers/ViewFee/ViewFee';
import CreateClassFee from './containers/CreateClassFee/CreateClassFee';
import ViewClassFee from './containers/ViewClassFee/ViewClassFee';
import UpdateStudentFee from './containers/UpdateStudentFee/UpdateStudentFee';
import ViewStudentFee from './containers/ViewStudentFee/ViewStudentFee';
import ViewStudentDuePaidFee from './containers/ViewStudentDuePaidFee/ViewStudentDuePaidFee';
import PayStudentFee from './containers/PayStudentFee/PayStudentFee';
import ViewClassReport from './containers/ViewClassReport/ViewClassReport';
import ViewSchoolReport from './containers/ViewSchoolReport/ViewSchoolReport';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/admin/createFee" component={CreateFee} />
            <Route path="/admin/createClassFee" component={CreateClassFee} />
            <Route path="/admin/createTeacher" component={CreateTeacher} />
            <Route path="/admin/createStudent" component={CreateStudent} />
            <Route path="/admin/createSection" component={CreateSection} />
            <Route path="/admin/createTimetable" component={CreateTimetable} />
            <Route path="/admin/createHomework" component={CreateHomework} />
            <Route path="/admin/createAttendance/:sectionName" component={CreateAttendance} />
            <Route path="/admin/updateStudentFee" component={UpdateStudentFee} />
            <Route path="/admin/viewFee" component={ViewFee} />
            <Route path="/admin/viewClassFee" component={ViewClassFee} />
            <Route path="/admin/viewStudentFee/:sid" component={ViewStudentFee} />
            <Route path="/admin/payStudentFee/:sid" component={PayStudentFee} />
            <Route path="/admin/viewStudentDuePaidFee/:sid" component={ViewStudentDuePaidFee} />
            <Route path="/admin/viewClassReport/:cid" component={ViewClassReport} />
            <Route path="/admin/viewSchoolReport" component={ViewSchoolReport} />
            
            <Route path="/admin/viewTeacher" component={ViewTeachers} />
            <Route path="/admin/viewStudent" component={ViewStudents} />
            <Route path="/admin/viewSection" component={ViewSections} />
            <Route path="/admin/viewAttendanceOfAllStudents/:secid/:month/:academicYear" component={ViewAttendanceOfAllStudents} />        
            <Route path="/admin/viewAttendanceOfAcademicYear/:studentId/:academicYear" component={ViewAttendanceOfAcademicYear} />        
            <Route path="/admin/viewAttendanceByMonth/:sectionName/:academicYear/:month" component={ViewAttendanceByMonth} />        
            {/* <Route path="/admin/viewAttendanceOfAcademicYear/:id/:name" component={ViewTimetableForTeacher} /> */}
            <Route path="/admin/viewTimetableForStudents/:sid" component={ViewTimetableForStudents} />
            <Route path="/admin/viewTimetableForTeacher/:id/:teacherName" component={ViewTimetableForTeacher} />
            <Route path="/admin/allSubjectsHomeWork/:id/:teacherName/:className/:sectionName" component={ViewAllSubjectsHomeWork} />
            <Route path="/admin/editHomeWorkAssignedToAllClasses/:id/:teacherName/:className/:sectionName" component={ViewHomeWorkAssignedToAllClasses} />
            
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
