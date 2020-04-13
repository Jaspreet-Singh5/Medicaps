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


import axios from '../../axios-timeslotsForTeacher';
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
  };

class ViewTimetableForTeacher extends Component {
    componentDidMount () {
        this.props.onFetchTimeslotsForTeacher(this.props.match.params.id);
    }

    render () {
        const { classes } = this.props;

        let timeslots = <Spinner />;
        if ( !this.props.loading && this.props.timeslots) {

            console.log(this.props.timeslots);


            timeslots = 
            // console.log(timeslots);
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right" colSpan={2}>Time</TableCell>
                  <TableCell align="center" rowSpan={2}>8:00 - 9:00</TableCell>
                  <TableCell align="center" rowSpan={2}>9:00 - 10:00</TableCell>
                  <TableCell align="center" rowSpan={2}>10:00 - 11:00</TableCell>
                  <TableCell align="center" rowSpan={2}>11:00 - 12:00</TableCell>
                  <TableCell align="center" rowSpan={2}>12:00 - 1:00</TableCell>
                  <TableCell align="center" rowSpan={2}>1:00 - 2:00</TableCell>
                </TableRow>

                
                <TableRow>
                  <TableCell colSpan={2} component="th" align="center">Day</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {this.props.timeslots.map((timeslot) => (
                  <TableRow key={timeslot.dayName}>
                    <TableCell component="th" scope="row" colSpan={2} align="center">
                      {timeslot.dayName.toUpperCase()}
                    </TableCell>
                    {timeslot.slots.map((slot) => (
                        <TableCell align="center">{slot.subName} - {slot.sectionName}</TableCell>
                    ))
                    }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>;
        }

        const goBack = () => {
            this.props.history.goBack();
        }

        return (
            <div>
                
                <Typography variant="h2" gutterBottom style={{ textAlign: 'center', textTransform: 'uppercase' }}>
                    Time Table
                </Typography>
                <Typography variant="h6" gutterBottom style={{ textAlign: 'left', margin: 20, textTransform: 'uppercase' }}>
                    TEACHER'S NAME: {this.props.match.params.name}
                </Typography>
                
                {timeslots}

                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{ width: '10%', float: 'right', margin: 50, marginRight: 150 }}
                    onClick={goBack}    
                >
                    Back
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        timeslots: state.timetableForTeacher.timetable,
        loading: state.timetableForTeacher.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTimeslotsForTeacher: (id) => dispatch( actions.fetchTimeslotsForTeacher(id) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( withStyles(styles)(ViewTimetableForTeacher), axios ) );