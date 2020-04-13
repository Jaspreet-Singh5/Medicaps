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


import classes from './ViewStudents.css';

import axios from '../../axios-admin';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Hoc/Hoc';

class ViewStudents extends Component {

    componentDidMount() {
        this.props.onFetchStudents();
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
                            <TableCell align="right">Section Name</TableCell>
                            <TableCell align="right">Father Name</TableCell>
                            <TableCell align="right">Mother Name</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">D.O.B.</TableCell>
                            <TableCell align="right">Aadhar Number</TableCell>
                            <TableCell align="right">Account Number</TableCell>
                            <TableCell align="right">SSSMID</TableCell>
                            <TableCell align="right">Enrollment Number</TableCell>
                            <TableCell align="right">Roll Number</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userElementsArray.map((userElement) => (
                                <TableRow key={userElement.id}>
                                    <TableCell component="th" scope="row">
                                        {userElement.details.name ? userElement.details.name : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userElement.details.sectionName.name ? userElement.details.sectionName.name : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userElement.details.fatherName ? userElement.details.fatherName : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userElement.details.motherName ? userElement.details.motherName : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userElement.details.address ? userElement.details.address : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userElement.details.dob ? userElement.details.dob : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userElement.details.aadharNumber ? userElement.details.aadharNumber : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userElement.details.accountNumber ? userElement.details.accountNumber : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userElement.details.SSSMID ? userElement.details.SSSMID : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userElement.details.enrollmentNumber ? userElement.details.enrollmentNumber : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userElement.details.rollNumber ? userElement.details.rollNumber : ''}
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
            <Aux classes={classes.ViewStudents}>
                {table}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.viewStudents.users,
        loading: state.viewStudents.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchStudents: () => dispatch(actions.fetchStudents())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler((ViewStudents), axios));


