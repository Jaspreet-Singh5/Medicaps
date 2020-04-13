import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';

const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        //   marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    children: {
        marginTop: '7vh',
    },
    navLink: {
        color: '#fff!important',
        textDecoration: 'none',
        fontSize: '.8rem',
        textTransform: 'uppercase'
    }
};

class Layout extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        
                        <Typography variant="h6" className={classes.title}>
                            <NavLink to="/admin/viewTimetableForTeacher/253523532dsdfds/Sanju"
                                className={classes.navLink}>
                                View Timetable For Teacher
                            </NavLink>
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                            <NavLink to="/admin/viewTimetableForStudents/734737433sda/Reena/XII/B"
                            className={classes.navLink}>View Timetable For Students</NavLink>
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                            <NavLink to="/admin/allSubjectsHomeWork/sasfasf342342/George/X/C"
                            className={classes.navLink}>View All Subjects HomeWork</NavLink>
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                            <NavLink to="/admin/editHomeWorkAssignedToAllClasses/3rwwesfdsfs34234/Manmohan/IX/F"
                            className={classes.navLink}>View Homework Assigned To All Classes</NavLink>
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>

                <div className={classes.children}>
                    {
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Layout);