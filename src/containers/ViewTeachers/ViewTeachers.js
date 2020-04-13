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


import classes from './ViewTeachers.css';

import axios from '../../axios-admin';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Hoc/Hoc';

class ViewTeachers extends Component {

    componentDidMount() {
        this.props.onFetchTeachers();
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

            console.log(userElementsArray);
        }

        let table = null;
        if (this.props.users) {
            table =
                <TableContainer component={Paper} className={classes.ViewTableContainer}>
                    <Table aria-label="simple table" className={classes.ViewTable}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Father Or Spouse Name</TableCell>
                                <TableCell align="right">Address</TableCell>
                                <TableCell align="right">Dob</TableCell>
                                <TableCell align="right">Aadhar Number</TableCell>
                                <TableCell align="right">Account Number</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Date Of Joining</TableCell>
                                <TableCell align="right">Position Of Responsibility</TableCell>
                                <TableCell align="right">Education</TableCell>
                                <TableCell align="right">Salary</TableCell>
                                <TableCell align="right">SSSMID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userElementsArray.map((userElement) => (
                                <TableRow key={userElement.id}>
                                    <TableCell component="th" scope="row">
                                        {userElement.details.name ? userElement.details.name : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userElement.details.fatherOrSpouseName ? userElement.details.fatherOrSpouseName : ''}
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
                                        {userElement.details.email ? userElement.details.email : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userElement.details.dateOfJoining ? userElement.details.dateOfJoining : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userElement.details.positionOfResponsibility ? userElement.details.positionOfResponsibility : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userElement.details.education ? userElement.details.education : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userElement.details.salary ? userElement.details.salary : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userElement.details.SSSMID ? userElement.details.SSSMID : ''}
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
            <Aux classes={classes.ViewTeachers}>
                {table}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.viewTeachers.users,
        loading: state.viewTeachers.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTeachers: () => dispatch(actions.fetchTeachers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler((ViewTeachers), axios));


