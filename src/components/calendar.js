import Paper from '@mui/material/Paper';
//import { ViewState } from '@devexpress/dx-react-scheduler';
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

const currentDate = '2022-03-02'
const schedulerData = [
  { startDate: '2022-03-02T08:00', endDate: '2022-03-02T11:00', title: "Clean Lata's home"},
  { startDate: '2022-03-02T08:00', endDate: '2022-03-02T11:00', title: "Clean Brandon's home"}
]


const Calendar = () => {
  return (
    <Paper>
      <Scheduler
        data={schedulerData}
        heigh={660}
      >
        <ViewState currentDate={currentDate}
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
        <Toolbar />
        <ViewSwitcher />
        <MonthView />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        <AppointmentTooltip
          showCloseButton
          showOpenButton
        />
        <AppointmentForm
          readOnly
        />
      </Scheduler>
    </Paper>
  )
}

export default Calendar