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
} from '@devexpress/dx-react-scheduler-material-ui';
import {ViewState} from "@devexpress/dx-react-scheduler";
import { useEffect, useState } from 'react';
import { getCurrentDate } from '../utils/getCurrentDate';
import Appointment from './appoinment';
import BookingDataService from '../services/BookingService';



let date = getCurrentDate('-')
console.log(date)
const currentDate = date
const data = [
  { id: 1, startDate: '2023-03-02T08:00', endDate: '2023-03-02T11:00', title: "Clean Lata's home", address: '1234 Main St', city: 'FL'},
  { id: 2, startDate: '2023-03-02T08:00', endDate: '2023-03-02T11:00', title: "Clean Brandon's home", address: '1234 Main St', city: 'FL'},
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

  

  return (
      <Paper>
        <Scheduler
          data={appoinments}
        >
          <ViewState
            defaultCurrentDate={today}
            defaultCurrentViewName="Week"
          />
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
        </Scheduler>
      </Paper>
    );
  }
export default Calendar