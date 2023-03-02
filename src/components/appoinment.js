import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useEffect, useState } from 'react';

const Appointment = ({
  children, style, ...restProps
}) => {

  const [backgroundColor, setBackgroundColor] = useState('#FFC107');

  useEffect(() => {
    setBackgroundColor('#FFC107');
  }, []);

  return (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: '#FFC107',
      borderRadius: '8px',
    }}
  >
    {children}
  </Appointments.Appointment>
  )
}

export default Appointment