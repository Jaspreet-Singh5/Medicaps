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

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import MaterialTable from 'material-table';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Aux from '../../hoc/Hoc/Hoc';


import Input from '../../components/UI/Input/Input';

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

class CreateTimetable extends Component {

  state = {
    createTimetableForm: {
        sectionName: {
            elementLabel: 'Section Name',
            elementType: 'select',
            elementConfig: {
                type: 'select',
                placeholder: 'Choose section',
                name: 'sectionName',
                options: []
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        releaseDate: {
            elementLabel: "Release Date",
            elementType: 'text',
            elementConfig: {
                type: 'date',
                placeholder: '12-06-17',
                name: 'releaseDate'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        timetableDetails: {
            elementLabel: "Timetable Details",
            elementType: 'timetable',
            elementConfig: {
                type: 'timetable',
                placeholder: '12-06-17',
                name: 'timetableDetails',
                options: [],
                columns: [
                    { title: 'Subject Name', field: 'subName', text: 'text'
                    },
                    { title: 'Teacher Teaching', field: 'teacherTeaching', type: 'text' },
                    { title: 'Start Time', field: 'startTime', type: 'time' },
                    { title: 'End Time', field: 'endTime', type: 'time' },
                ],
                timetableDetails: [
                    {
                        dayName: "monday",
                    },
                    {
                        dayName: "tuesday",
                    },
                    {
                        dayName: "wednesday",
                    },
                    {
                        dayName: "thursday",
                    },
                    {
                        dayName: "friday",
                    },
                    {
                        dayName: "saturday",
                    }
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
    mondaySlots: [
    ],
    tuesdaySlots: [
    ],
    wednesdaySlots: [
        
    ],
    thursdaySlots: [
        
    ],
    fridaySlots: [
        
    ],
    saturdaySlots: [
        
    ],
    formIsValid: false
  }

  componentDidMount() {
    this.props.onFetchTeachers();
    this.props.onFetchSections();
    this.props.onFetchStudents();
  }

  
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
        const updatedCreateTimetableForm = {
            ...this.state.createTimetableForm
        };
        const updatedFormElement = {
            ...updatedCreateTimetableForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;

        updatedCreateTimetableForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedCreateTimetableForm) {
            formIsValid = updatedCreateTimetableForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ createTimetableForm: updatedCreateTimetableForm, formIsValid: formIsValid });
    }

  render() {

    // const studentsArray = [];

    // if (this.props.students && this.state.createTimetableForm.sectionName.touched) {
    //   this.props.students.forEach(student => {
    //     if (student.sectionName._id === this.state.createTimetableForm.sectionName.value) {
    //       studentsArray.push(student);
    //     }
    //   });
    //   console.log(studentsArray);
    // }


    const { classes } = this.props;
    const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

    const formElementsArray = [];
    for (let key in this.state.createTimetableForm) {
      formElementsArray.push({
        id: key,
        config: this.state.createTimetableForm[key]
      })
    }

    let form = null;

    
    console.log("Sections");
    console.log(this.props.sections);
    console.log("Teachers");
    console.log(this.props.teachers);

    if (!this.state.loading && this.props.sections && this.props.teachers) {

      console.log("SDfsd");

      if (formElementsArray[0].config.elementConfig.options.length === 0) {
        this.props.sections.map(section => {
          formElementsArray[0].config.elementConfig.options.push({
            value: section._id,
            displayValue: section.name
          });
        })
      }

    //   if (this.state.attendanceCollection.length === 0) {
    //     studentsArray.map(student => {
    //       this.state.attendanceCollection.push({
    //         student: student._id,
    //         studentName: student.name,
    //         status: 'present'
    //       })
    //     })
    //   }

      form =
        <form className={classes.CreateTimetableForm}
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
          
          {
                             this.state.createTimetableForm.timetableDetails.elementConfig.timetableDetails.map((timetableDetail, i) => (
                                 <MaterialTable
                                     style={{ margin: 10, width: '100%', fontSize: '1rem!important' }}
                                     title={timetableDetail.dayName.toUpperCase()}
                                     columns={this.state.createTimetableForm.timetableDetails.elementConfig.columns}
                                     data={this.state[timetableDetail.dayName + 'Slots']}
                                     editable={{
                                         onRowAdd: (newData) =>
                                             new Promise((resolve) => {
                                                 setTimeout(() => {
                                                     resolve();
                                                     this.setState((prevState) => {
                                                         const name = timetableDetail.dayName + 'Slots';
                                                         const slots = [...prevState[name]];
                                                         slots.push(newData);
                                                         return { ...prevState, [name]: slots };
                                                     });
                                                 }, 600);
                                             }),
                                         onRowUpdate: (newData, oldData) =>
                                             new Promise((resolve) => {
                                                 setTimeout(() => {
                                                     resolve();
                                                     if (oldData) {
                                                         this.setState((prevState) => {
                                                             const name = timetableDetail.dayName + 'Slots';
                                                             const slots = [...prevState[name]];
                                                             slots[slots.indexOf(oldData)] = newData;
                                                             return { ...prevState, [name]: slots };
                                                         });
                                                     }
                                                 }, 600);
                                             }),
                                         onRowDelete: (oldData) =>
                                             new Promise((resolve) => {
                                                 setTimeout(() => {
                                                     resolve();
                                                     this.setState((prevState) => {
                                                         const name = timetableDetail.dayName + 'Slots';
                                                         const slots = [...prevState[name]];
                                                         slots.splice(slots.indexOf(oldData), 1);
                                                         return { ...prevState, [name]: slots };
                                                     });
                                                 }, 600);
                                             }),
                                     }}
                                 />
                             ))
                         }


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
                onClick={(e) => this.props.onCreateAttendance(e, this.state.createAttendanceForm, this.state.attendanceCollection)}
              >
                Create Attendance
                        </Button>
            </Grid>
          </Grid>
        </form>;
    } else {
      form = <Spinner></Spinner>
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
          ATTENDANCE OF ALL STUDENTS
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

        {form}

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
    res: state.createTimetable.res,
    loading: state.createTimetable.loading,
    alert: state.createTimetable.alert,
    error: state.createTimetable.error,
    sections: state.viewSections.users,
    sectionsloading: state.viewSections.loading,
    teachers: state.viewTeachers.users,
    teachersloading: state.viewTeachers.loading,
    students: state.viewStudents.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateTimetable: (e, form, mondaySlots, 
                        tuesdaySlots, wednesdaySlots,
                        thursdaySlots, fridaySlots,
                        saturdaySlots) => dispatch(actions.createTimetable(e, form, mondaySlots, 
                            tuesdaySlots, wednesdaySlots,
                            thursdaySlots, fridaySlots,
                            saturdaySlots)),
    onFetchSections: () => dispatch(actions.fetchSections()),
    onFetchTeachers: () => dispatch(actions.fetchTeachers()),
    onFetchStudents: () => dispatch(actions.fetchStudents()),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withStyles(styles)(CreateTimetable), axios));

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import Button from '@material-ui/core/Button';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import MaterialTable from 'material-table';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

// import Input from '../../components/UI/Input/Input';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import Aux from '../../hoc/Hoc/Hoc';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import { Alert, AlertTitle } from '@material-ui/lab';

// import axios from '../../axios-admin';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import * as actions from '../../store/actions/index';
// import classes from './CreateTimetable.css';

// const initState = {
//     createTimetableForm: {
//         sectionName: {
//             elementLabel: 'Section Name',
//             elementType: 'select',
//             elementConfig: {
//                 type: 'select',
//                 placeholder: 'Choose section',
//                 name: 'sectionName',
//                 options: []
//             },
//             value: '',
//             validation: {
//                 required: true
//             },
//             valid: false,
//             touched: false
//         },
//         releaseDate: {
//             elementLabel: "Release Date",
//             elementType: 'text',
//             elementConfig: {
//                 type: 'date',
//                 placeholder: '12-06-17',
//                 name: 'releaseDate'
//             },
//             value: '',
//             validation: {
//                 required: true
//             },
//             valid: false,
//             touched: false
//         },
//         timetableDetails: {
//             elementLabel: "Timetable Details",
//             elementType: 'timetable',
//             elementConfig: {
//                 type: 'timetable',
//                 placeholder: '12-06-17',
//                 name: 'timetableDetails',
//                 options: [],
//                 columns: [
//                     { title: 'Subject Name', field: 'subName',
//                       editComponent: props => (
//                         <Input
//                             key={1}
//                             id={1}
//                             elementType='select'
//                             elementConfig= {{
//                                 type: 'select',
//                                 placeholder: 'Choose section',
//                                 name: 'subName',
//                                 options: this.state.timetableDetails.elementConfig.options
//                             }}
//                             value={[]}
//                             invalid={false}
//                             shouldValidate={false}
//                             touched={true}
//                             changed={(event) => this.inputChangedHandler(event, 'subName')}>
//                         </Input>
//                       )
//                     },
//                     { title: 'Teacher Teaching', field: 'teacherTeaching', type: 'select' },
//                     { title: 'Start Time', field: 'startTime', type: 'time' },
//                     { title: 'End Time', field: 'endTime', type: 'time' },
//                 ],
//                 timetableDetails: [
//                     {
//                         dayName: "monday",
//                     },
//                     {
//                         dayName: "tuesday",
//                     },
//                     {
//                         dayName: "wednesday",
//                     },
//                     {
//                         dayName: "thursday",
//                     },
//                     {
//                         dayName: "friday",
//                     },
//                     {
//                         dayName: "saturday",
//                     }
//                 ]
//             },
//             value: '',
//             validation: {
//                 required: false
//             },
//             valid: true,
//             touched: false
//         }
//     },
//     mondaySlots: [
//     ],
//     tuesdaySlots: [
//     ],
//     wednesdaySlots: [
        
//     ],
//     thursdaySlots: [
        
//     ],
//     fridaySlots: [
        
//     ],
//     saturdaySlots: [
        
//     ],
//     formIsValid: false
// };

// class CreateTimetable extends Component {

//     componentDidMount() {
//         this.props.onFetchSections();
//         this.props.onFetchTeachers();
//     }

//     state = initState;

//     checkValidity = (value, rules) => {
//         let isValid = true;

//         if (!rules) {
//             return true;
//         }
//         if (rules.required) {
//             isValid = value.trim() !== '' && isValid;
//         }

//         if (rules.minLength) {
//             isValid = value.length >= rules.minLength && isValid;
//         }

//         if (rules.maxLength) {
//             isValid = value.length <= rules.maxLength && isValid;
//         }

//         return isValid;
//     }

//     inputChangedHandler = (event, inputIdentifier) => {
//         const updatedCreateTimetableForm = {
//             ...this.state.createTimetableForm
//         };
//         const updatedFormElement = {
//             ...updatedCreateTimetableForm[inputIdentifier]
//         }

//         updatedFormElement.value = event.target.value;
//         updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
//         updatedFormElement.touched = true;

//         updatedCreateTimetableForm[inputIdentifier] = updatedFormElement;

//         let formIsValid = true;
//         for (let inputIdentifier in updatedCreateTimetableForm) {
//             formIsValid = updatedCreateTimetableForm[inputIdentifier].valid && formIsValid;
//         }

//         this.setState({ createTimetableForm: updatedCreateTimetableForm, formIsValid: formIsValid });
//     }

//     render() {
//         const formElementsArray = [];
//         for (let key in this.state.createTimetableForm) {
//             formElementsArray.push({
//                 id: key,
//                 config: this.state.createTimetableForm[key]
//             })
//         }

//         let form = null;

//         if (!this.state.loading && this.props.sections && this.props.teachers) {

//             if(formElementsArray[0].config.elementConfig.options.length === 0) {
//                 this.props.sections.map(section => {
//                     formElementsArray[0].config.elementConfig.options.push({
//                         value: section._id,
//                         displayValue: section.name
//                     });
//                 })
//             }

//             if(formElementsArray[2].config.elementConfig.options.length === 0) {
//                 this.props.sections.map(section => {
//                     formElementsArray[2].config.elementConfig.options.push({
//                         value: section._id,
//                         displayValue: section.name
//                     });
//                 })
//             }

//             form =
//                 <form className={classes.CreateTimetableForm}
//                 >
//                     {formElementsArray.map(formElement => (
//                         <Aux>
//                             <Input
//                                 key={formElement.id}
//                                 id={formElement.id}
//                                 elementType={formElement.config.elementType}
//                                 elementConfig={formElement.config.elementConfig}
//                                 value={formElement.config.value}
//                                 invalid={!formElement.config.valid}
//                                 shouldValidate={formElement.config.validation}
//                                 touched={formElement.config.touched}
//                                 changed={(event) => this.inputChangedHandler(event, formElement.id)}
//                                 label={formElement.config.elementLabel}>
//                             </Input>
//                         </Aux>
//                     ))}

//                     {
//                             this.state.createTimetableForm.timetableDetails.elementConfig.timetableDetails.map((timetableDetail, i) => (
//                                 <MaterialTable
//                                     style={{ margin: 10, width: '100%', fontSize: '1rem!important' }}
//                                     title={timetableDetail.dayName.toUpperCase()}
//                                     columns={this.state.createTimetableForm.timetableDetails.elementConfig.columns}
//                                     data={this.state[timetableDetail.dayName + 'Slots']}
//                                     editable={{
//                                         onRowAdd: (newData) =>
//                                             new Promise((resolve) => {
//                                                 setTimeout(() => {
//                                                     resolve();
//                                                     this.setState((prevState) => {
//                                                         const name = timetableDetail.dayName + 'Slots';
//                                                         const slots = [...prevState[name]];
//                                                         slots.push(newData);
//                                                         return { ...prevState, [name]: slots };
//                                                     });
//                                                 }, 600);
//                                             }),
//                                         onRowUpdate: (newData, oldData) =>
//                                             new Promise((resolve) => {
//                                                 setTimeout(() => {
//                                                     resolve();
//                                                     if (oldData) {
//                                                         this.setState((prevState) => {
//                                                             const name = timetableDetail.dayName + 'Slots';
//                                                             const slots = [...prevState[name]];
//                                                             slots[slots.indexOf(oldData)] = newData;
//                                                             return { ...prevState, [name]: slots };
//                                                         });
//                                                     }
//                                                 }, 600);
//                                             }),
//                                         onRowDelete: (oldData) =>
//                                             new Promise((resolve) => {
//                                                 setTimeout(() => {
//                                                     resolve();
//                                                     this.setState((prevState) => {
//                                                         const name = timetableDetail.dayName + 'Slots';
//                                                         const slots = [...prevState[name]];
//                                                         slots.splice(slots.indexOf(oldData), 1);
//                                                         return { ...prevState, [name]: slots };
//                                                     });
//                                                 }, 600);
//                                             }),
//                                     }}
//                                 />
//                             ))
//                         }

//                     <Grid container spacing={3}>
//                         <Grid item xs={12}>
//                             <Button
//                                 fullWidth
//                                 style={{ margin: 10 }}
//                                 disabled={!this.state.formIsValid ? true : false}
//                                 type="submit"
//                                 name="submit"
//                                 variant="contained"
//                                 color="primary"
//                                 className={classes.button}
//                                 endIcon={<ArrowForwardIcon />}
//                                 onClick={(e) => this.props.onCreateTimetable(e, this.state.createTimetableForm, this.state.mondaySlots, 
//                                                                                 this.state.tuesdaySlots, this.state.wednesdaySlots,
//                                                                                 this.state.thursdaySlots, this.state.fridaySlots,
//                                                                                 this.state.saturdaySlots)}
//                             >
//                                 Create Timetable
//                         </Button>
//                         </Grid>
//                     </Grid>
//                 </form>;
//         } else {
//             form = <Spinner></Spinner>
//         }

//         let alert = null;
//         if (this.props.alert === 'success') {
//             alert =
//                 <Alert severity="success" style={{ width: '50%', marginRight: 'auto', marginLeft: 'auto' }}>
//                     <AlertTitle>Success</AlertTitle>
//                 {this.props.res}
//             </Alert>;
//         } else if (this.state.alert === 'failure') {
//             alert =
//                 <Alert severity="error" style={{ width: '50%', marginRight: 'auto', marginLeft: 'auto' }}>
//                     <AlertTitle>Error</AlertTitle>
//                     {this.props.error}
//           </Alert>;
//         }

//         return (
//             <Aux>
//                 <Grid container spacing={3}>
//                     <Grid item xs={5} className={classes.LeftGrid}>

//                     </Grid>
//                     <Grid item xs={7}>
//                         <Typography variant="h2" gutterBottom style={{ marginTop: '15vh', textAlign: 'center', textTransform: 'uppercase' }}>
//                             Create a Timetable
//                         </Typography>
//                         {alert}
//                         {form}
                        
//                     </Grid>
//                 </Grid>
//             </Aux>
//         );
//     }
// }

// const mapStateToProps = state => {
//     return {
//         res: state.createTimetable.res,
//         loading: state.createTimetable.loading,
//         alert: state.createTimetable.alert,
//         error: state.createTimetable.error,
//         sections: state.viewSections.users,
//         teachers: state.viewTeachers.users    
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onCreateTimetable: (e, form, mondaySlots, 
//             tuesdaySlots, wednesdaySlots,
//             thursdaySlots, fridaySlots,
//             saturdaySlots) => dispatch(actions.createTimetable(e, form, mondaySlots, 
//                 tuesdaySlots, wednesdaySlots,
//                 thursdaySlots, fridaySlots,
//                 saturdaySlots)),
//         onFetchSections: () => dispatch(actions.fetchSections()),
//         onFetchTeachers: () => dispatch(actions.fetchTeachers())
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler((CreateTimetable), axios));
