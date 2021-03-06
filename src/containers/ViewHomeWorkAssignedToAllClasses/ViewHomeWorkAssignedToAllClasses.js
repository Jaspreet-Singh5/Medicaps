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


import axios from '../../axios-homeWorkAssignedToAllClasses';
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
  }
};

class ViewHomeWorkAssignedToAllClasses extends Component {
  componentDidMount() {
    this.props.onFetchHomeWorkAssignedToAllClasses(this.props.match.params.id);
  }

  render() {
    const { classes } = this.props;

    let homeworks = <Spinner />;
    if (!this.props.loading && this.props.homeworks) {
      console.log(this.props.homeworks);
      homeworks =
        // console.log(timeslots);
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">SR NO.</TableCell>
                <TableCell align="center">CLASS AND SECTION</TableCell>
                <TableCell align="center">SUBJECT</TableCell>
                <TableCell align="center">HOMEWORK</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {this.props.homeworks.map((homework, i) => (
                <TableRow key={homework.subName}>
                  <TableCell component="th" scope="row" align="center">
                    {i + 1}
                  </TableCell>
                  <TableCell align="center">
                    {homework.sectionName}
                  </TableCell>
                  <TableCell align="center">
                    {homework.subName.toUpperCase()}
                  </TableCell>
                  <TableCell align="center">
                    {homework.homeworkDetails}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ width: '100%' }}
                      // style={{ width: '10%', float: 'right', margin: 50, marginRight: 150 }}
                      
                    >
                      Edit Homework
                    </Button>  
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>;
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
          HOMEWORK ASSIGNED TO ALL CLASSES
          </Typography>
        {/* <div className={classes.detailsContainer}> */}
          <Typography variant="h6" gutterBottom style={{ textAlign: 'left', margin: 20 }}>
            Teacher's Name: {this.props.match.params.teacherName}
                  </Typography>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'left', margin: 20 }}>
            Date: {currDate()}
          </Typography>
        {/* </div> */}

        {homeworks}

        <Grid container className={classes.root} spacing={2} justify="space-around" style={{ marginTop: 10 }}>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="success"
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
    homeworks: state.homeWorkAssignedToAllClasses.homeworks,
    loading: state.homeWorkAssignedToAllClasses.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchHomeWorkAssignedToAllClasses: (id) => dispatch(actions.fetchHomeWorkAssignedToAllClasses(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withStyles(styles)(ViewHomeWorkAssignedToAllClasses), axios));