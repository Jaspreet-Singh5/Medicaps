import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import MaterialTable from 'material-table';

import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Hoc/Hoc';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';

import axios from '../../axios-admin';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import classes from './CreateHomework.css';

const initState = {
    createHomeworkForm: {
        subName: {
            elementLabel: 'Subject Name',
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: 'English',
                name: 'subName',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        homeworkGivenByTeacher: {
            elementLabel: 'Homework Given By Teacher',
            elementType: 'select',
            elementConfig: {
                type: 'select',
                placeholder: 'Choose teacher',
                name: 'homeworkGivenByTeacher',
                options: [
                    
                ]
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        sectionName: {
            elementLabel: 'Section Name',
            elementType: 'select',
            elementConfig: {
                type: 'select',
                placeholder: 'Choose section',
                name: 'sectionName',
                options: [
                    
                ]
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        homeworkDetails: {
            elementLabel: 'Homework Details',
            elementType: 'textarea',
            elementConfig: {
                rows: 5,
                type: 'textarea',
                placeholder: 'Complete it as soon as possible',
                name: 'homeworkDetails',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        dueDate: {
            elementLabel: "Due Date",
            elementType: 'text',
            elementConfig: {
                type: 'date',
                placeholder: '12-06-17',
                name: 'dueDate'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        assignedToStudents: {
            elementLabel: "Assigned To Students",
            elementType: 'list',
            elementConfig: {
                type: 'list',
                placeholder: '',
                name: 'assignedToStudents',
                columns: [
                    { title: 'Student', field: 'student' },
                    { title: 'Status', field: 'status', type: 'string', 
                      enum: ["incomplete", "complete"],
                      default: "incomplete" }
                ]
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        }
    },
    students: [
    ],
    formIsValid: false
};

class CreateHomework extends Component {

    componentDidMount() {
        this.props.onFetchSections();
        this.props.onFetchTeachers();
    }

    state = initState;

    checkValidity = (value, rules) => {
        let isValid = true;

        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedCreateHomeworkForm = {
            ...this.state.createHomeworkForm
        };
        const updatedFormElement = {
            ...updatedCreateHomeworkForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;

        updatedCreateHomeworkForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedCreateHomeworkForm) {
            formIsValid = updatedCreateHomeworkForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ createHomeworkForm: updatedCreateHomeworkForm, formIsValid: formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.createHomeworkForm) {
            formElementsArray.push({
                id: key,
                config: this.state.createHomeworkForm[key]
            })
        }

        let form = null;

        if (!this.state.loading && this.props.sections && this.props.teachers) {

            if(formElementsArray[2].config.elementConfig.options.length === 0) {
                this.props.sections.map(section => {
                    formElementsArray[2].config.elementConfig.options.push({
                        value: section._id,
                        displayValue: section.name
                    });
                })
            }

            if(formElementsArray[1].config.elementConfig.options.length === 0) {
                this.props.teachers.map(teacher => {
                    formElementsArray[1].config.elementConfig.options.push({
                        value: teacher._id,
                        displayValue: teacher.name
                    });
                })
            }

            form =
                <form className={classes.CreateHomeworkForm}
                >
                    {formElementsArray.map(formElement => (
                        <Aux>
                            <Input
                                key={formElement.id}
                                id={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                label={formElement.config.elementLabel}>
                            </Input>
                        </Aux>
                    ))}
                    
                    <MaterialTable
                                    style={{ margin: 10, width: '100%', fontSize: '1rem!important' }}
                                    title={'Assigned To Students'}
                                    columns={this.state.createHomeworkForm.assignedToStudents.elementConfig.columns}
                                    data={this.state.students}
                                    editable={{
                                        onRowAdd: (newData) =>
                                            new Promise((resolve) => {
                                                setTimeout(() => {
                                                    resolve();
                                                    this.setState((prevState) => {
                                                        const students = [...prevState.students];
                                                        students.push(newData);
                                                        return { ...prevState, students: students };
                                                    });
                                                }, 600);
                                            }),
                                        onRowUpdate: (newData, oldData) =>
                                            new Promise((resolve) => {
                                                setTimeout(() => {
                                                    resolve();
                                                    if (oldData) {
                                                        this.setState((prevState) => {
                                                            const students = [...prevState.students];
                                                            students[students.indexOf(oldData)] = newData;
                                                            return { ...prevState, students: students };
                                                        });
                                                    }
                                                }, 600);
                                            }),
                                        onRowDelete: (oldData) =>
                                            new Promise((resolve) => {
                                                setTimeout(() => {
                                                    resolve();
                                                    this.setState((prevState) => {
                                                        const students = [...prevState.students];
                                                        students.splice(students.indexOf(oldData), 1);
                                                        return { ...prevState, students: students };
                                                    });
                                                }, 600);
                                            }),
                                    }}
                                />

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                style={{ margin: 10 }}
                                disabled={!this.state.formIsValid ? true : false}
                                type="submit"
                                name="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<ArrowForwardIcon />}
                                onClick={(e) => this.props.onCreateHomework(e, this.state.createHomeworkForm, this.state.students)}
                            >
                                Create Homework
                        </Button>
                        </Grid>
                    </Grid>
                </form>;
        } else {
            form = <Spinner></Spinner>
        }

        let alert = null;
        if (this.props.alert === 'success') {
            alert =
                <Alert severity="success" style={{ width: '50%', marginRight: 'auto', marginLeft: 'auto' }}>
                    <AlertTitle>Success</AlertTitle>
                {this.props.res}
            </Alert>;
        } else if (this.state.alert === 'failure') {
            alert =
                <Alert severity="error" style={{ width: '50%', marginRight: 'auto', marginLeft: 'auto' }}>
                    <AlertTitle>Error</AlertTitle>
                    {this.props.error}
          </Alert>;
        }

        return (
            <Aux>
                <Grid container spacing={3}>
                    <Grid item xs={5} className={classes.LeftGrid}>

                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="h2" gutterBottom style={{ marginTop: '15vh', textAlign: 'center', textTransform: 'uppercase' }}>
                            Create a Homework
                        </Typography>
                        {alert}
                        {form}
                        
                    </Grid>
                </Grid>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        res: state.createHomework.res,
        loading: state.createHomework.loading,
        alert: state.createHomework.alert,
        error: state.createHomework.error,
        sections: state.viewSections.users,
        teachers: state.viewTeachers.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateHomework: (e, form, students) => dispatch(actions.createHomework(e, form, students)),
        onFetchSections: () => dispatch(actions.fetchSections()),
        onFetchTeachers: () => dispatch(actions.fetchTeachers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler((CreateHomework), axios));
