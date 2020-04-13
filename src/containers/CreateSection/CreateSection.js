import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Hoc/Hoc';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';

import axios from '../../axios-admin';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import classes from './CreateSection.css';

const initState = {
    createSectionForm: {
        name: {
            elementLabel: 'Name',
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: 'XII',
                name: 'name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        academicYear: {
            elementLabel: 'Academic Year',
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: '2013-14',
                name: 'academicYear'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        nameInWords: {
            elementLabel: 'Name In Words',
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: 'Eleventh',
                name: 'nameInWords'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        totalStudents: {
            elementLabel: "Total Students",
            elementType: 'text',
            elementConfig: {
                type: 'number',
                placeholder: '7344346363',
                name: 'totalStudents'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    },
    formIsValid: false
};

class CreateSection extends Component {

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
        const updatedCreateSectionForm = {
            ...this.state.createSectionForm
        };
        const updatedFormElement = {
            ...updatedCreateSectionForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;

        updatedCreateSectionForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedCreateSectionForm) {
            formIsValid = updatedCreateSectionForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ createSectionForm: updatedCreateSectionForm, formIsValid: formIsValid });
    }


    render() {
        const formElementsArray = [];
        for (let key in this.state.createSectionForm) {
            formElementsArray.push({
                id: key,
                config: this.state.createSectionForm[key]
            })
        }

        let form = null;

        // error fixed #1/1
        if (!this.props.loading) {
            form =
                <form className={classes.CreateSectionForm}
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
                                changed={ (event) => this.inputChangedHandler(event, formElement.id)}
                                label={formElement.config.elementLabel}>
                            </Input>
                        </Aux>
                    ))}

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
                                onClick={(e) => this.props.onCreateSection(e, this.state.createSectionForm)}
                            >
                                Create Section
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
                    Section created successfully
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
                            Create a Section
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
        res: state.createSection.res,
        loading: state.createSection.loading,
        alert: state.createSection.alert,
        error: state.createSection.error,
        sections: state.viewSections.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateSection: (e, form) => dispatch(actions.createSection(e, form)),
        onFetchSections: () => dispatch(actions.fetchSections())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler((CreateSection), axios));
