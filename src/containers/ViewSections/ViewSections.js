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


import classes from './ViewSections.css';

import axios from '../../axios-admin';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Hoc/Hoc';

class ViewSections extends Component {

    componentDidMount() {
        this.props.onFetchSections();
    }

    render() {

        const userElementsArray = [];

        if (this.props.users) {

            this.props.users.forEach(element => {
                userElementsArray.push({
                    id: element._id,
                    details: {
                        ...element
                    }
                });
            });
        }

        let table = null;
        if (this.props.users) {
            table =
                <TableContainer component={Paper} className={classes.ViewTableContainer}>
                    <Table aria-label="simple table" className={classes.ViewTable}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Academic Year</TableCell>
                                <TableCell align="center">Name In Words</TableCell>
                                <TableCell align="center">Teachers Teaching In This Section</TableCell>
                                <TableCell align="center">Total Students</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userElementsArray.map((userElement) => (
                                <TableRow key={userElement.id}>
                                    <TableCell component="th" scope="row">
                                        {userElement.details.name ? userElement.details.name : ''}
                                    </TableCell>
                                    <TableCell align="center">
                                        {userElement.details.academicYear ? userElement.details.academicYear : ''}
                                    </TableCell>
                                    <TableCell align="center">
                                        {userElement.details.nameInWords ? userElement.details.nameInWords : ''}
                                    </TableCell>
                                    <TableCell align="center">
                                        {/* ================================== */}
                                        { userElement.details.teachersTeachingInThisSection.length ?  
                                            (
                                                <Table aria-label="simple table" className={classes.ViewTable}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center">Subject</TableCell>
                                                        <TableCell align="center">Teacher name</TableCell>
                                                        
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {userElement.details.teachersTeachingInThisSection.map((teacherTeachingInThisSection) => (
                                                        <TableRow key={userElement.id}>
                                                            <TableCell component="th" scope="row" align="center">
                                                                {teacherTeachingInThisSection.subject ? teacherTeachingInThisSection.subject : ''}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center">
                                                                {teacherTeachingInThisSection.teacherId.name ? teacherTeachingInThisSection.teacherId.name : ''}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                                </Table>
                                            )
                                            :
                                            ''
                                        }
                                        


                                    </TableCell>
                                    <TableCell align="center">
                                        {userElement.details.totalStudents ? userElement.details.totalStudents : ''}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        } else {
            table = <Spinner></Spinner>
        }
        ;

        return (
            <Aux classes={classes.ViewSections}>
                {table}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.viewSections.users,
        loading: state.viewSections.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchSections: () => dispatch(actions.fetchSections())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler((ViewSections), axios));


