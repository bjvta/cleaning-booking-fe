import Paper from '@mui/material/Paper';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  AllDayPanel,
  AppointmentTooltip,
  AppointmentForm,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  DragDropProvider,
  EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui';
import {ViewState, EditingState} from "@devexpress/dx-react-scheduler";
import { useEffect, useState } from 'react';
import { getCurrentDate } from '../utils/getCurrentDate';
import Appointment from './appoinment';
import BookingDataService from '../services/BookingService';
import moment from "moment"

var strftime = require('strftime')

let date = getCurrentDate('-')
console.log(date)
const currentDate = date
const data = [
  // { id: 1, startDate: '2023-03-02T08:00', endDate: '2023-03-02T11:00', title: "Clean Lata's home", address: '1234 Main St', city: 'FL'},
  // { id: 2, startDate: '2023-03-02T08:00', endDate: '2023-03-02T11:00', title: "Clean Brandon's home", address: '1234 Main St', city: 'FL'},
]


const Calendar = () => {
  const [today, setToday] = useState(currentDate)
  const [appoinments, setAppoinments] = useState(data)

  useEffect(() => {
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    setToday(date)
    retrieveAppoinments()
  }, [])

  const retrieveAppoinments = () => {
    BookingDataService.getAllForCalendar()
      .then(response => {
        setAppoinments(response.data)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const commitChanges = ({added, changed, deleted}) => {
    let data = appoinments.map(appoinment => (
      changed[appoinment.id] ? 
        { ...appoinment, ...changed[appoinment.id] } : appoinment));
    setAppoinments(data)
    let updated_appointment = appoinments.filter((appoinment) => changed[appoinment.id])
    convertToBookingObject(updated_appointment[0].id, changed[updated_appointment[0].id])
  }

  const convertToBookingObject = (id, appointment) => {
    let updated_date = strftime('%Y/%m/%d', appointment.startDate)
    let updated_time = strftime('%H:%M', appointment.startDate)
    

    let start_date = moment(appointment.startDate);
    let end_date = moment(appointment.endDate);
    let hours = end_date.diff(start_date, 'minutes') / 60
    let booking = {
      date: updated_date,
      time: updated_time,
      hours: hours,
    }
    console.log(booking);
    BookingDataService.update(id, booking)
  }
  

  return (
      <Paper>
        <Scheduler
          data={appoinments}
        >
          <ViewState
            defaultCurrentDate={today}
            defaultCurrentViewName="Week"
          />
          <EditingState
            onCommitChanges={commitChanges}
          />
          <EditRecurrenceMenu />
          <DayView
          startDayHour={7}
          endDayHour={17}
        />
        <WeekView
          startDayHour={7}
          endDayHour={17}
        />
          <MonthView />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />
          <Appointments 
            appointmentComponent={Appointment}
          />
        <AppointmentTooltip
          showCloseButton
          showOpenButton
        />
        <AppointmentForm
          readOnly
        />
        <DragDropProvider
          />
        </Scheduler>
      </Paper>
    );
  }
export default Calendar