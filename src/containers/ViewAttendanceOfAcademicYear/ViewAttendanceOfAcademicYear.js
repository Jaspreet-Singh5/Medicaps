import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import lightBlue from '@material-ui/core/colors/lightBlue';
import TodayIcon from '@material-ui/icons/Today';


import axios from '../../axios-admin';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const styles = {
  table: {
    minWidth: 650,
    maxWidth: '80%',
    marginRight: 'auto',
    marginLeft: 'auto',
    border: '5px solid #eee'
  },

  detailsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },

  shape: {
    backgroundColor: '#eee',
    width: 40,
    height: 40,
  },

  shapeCircle: {
    borderRadius: '50%',
  },
};

class ViewAttendanceOfAcademicYear extends Component {

  componentDidMount() {
    this.props.onFetchAttendanceOfAcademicYear(this.props.match.params.studentId, this.props.match.params.academicYear);
  }

  render() {

    const { classes } = this.props;
    let attendanceTable = null;

    if (!this.props.loading && this.props.attendances.length !== 0) {

      console.log(this.props.attendances);

      attendanceTable =
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">SR NO.</TableCell>
                <TableCell align="center">Month</TableCell>
                <TableCell align="center">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              { delete this.props.attendances.name }
              { Object.entries(this.props.attendances).map(([monthName, dates], i) => (

                <TableRow key={monthName}>
                  <TableCell component="th" scope="row" align="center">
                    {i + 1}
                  </TableCell>
                  <TableCell align="center">
                    {monthName.toUpperCase()}
                  </TableCell>
                  <TableCell align="center">
                    {dates.map((attendanceMark) => ( 
                      <Badge color={attendanceMark.status === 'present' ? 'primary' : attendanceMark.status === 'leave' ? 'secondary' : 'error' } badgeContent={attendanceMark.date} style={{ marginRight: 10 }}>
                        <TodayIcon></TodayIcon>
                      </Badge>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>;
    } else {
      attendanceTable = <Spinner></Spinner>;
    }

    const goBack = () => {
      this.props.history.goBack();
    }

    const currDate = () => {
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      return date;
    }

    const currDay = () => {
      const today = new Date();

      let weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

      const day = weekday[today.getDay()];

      return day;
    }

    return (
      <div>

        <Typography variant="h2" gutterBottom style={{ textAlign: 'center' }}>
          ATTENDANCE OF ACADEMIC YEAR
          </Typography>
        <div className={classes.detailsContainer}>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'left', margin: 20 }}>
            {/* CLASS AND SECTION {this.props.match.params.className} {this.props.match.params.sectionName}: */}
          </Typography>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'left', margin: 20 }}>
            {/* DAY: {currDay()} */}
          </Typography>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'left', margin: 20 }}>
            {/* DATE: {currDate()} */}
          </Typography>
        </div>

        {attendanceTable}

        <Grid container className={classes.root} spacing={2} justify="space-around" style={{ marginTop: 10 }}>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="secondary"
              style={{ width: '100%' }}

            >
              Previous Day
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: '100%' }}
              // style={{ width: '10%', float: 'right', margin: 50, marginRight: 150 }}
              onClick={goBack}
            >
              Back
                </Button>
          </Grid>
        </Grid>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    attendances: state.attendanceOfAcademicYear.attendances,
    loading: state.attendanceOfAcademicYear.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchAttendanceOfAcademicYear: (sectionName, academicYear) => dispatch(actions.fetchAttendanceOfAcademicYear(sectionName, academicYear))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withStyles(styles)(ViewAttendanceOfAcademicYear), axios));