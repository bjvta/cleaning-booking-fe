import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useEffect, useState } from 'react';

const Appointment = ({
  children, style, ...restProps
}) => {

  const [color, setColor] = useState('')

  useEffect(() => {
    setColor('#FFC107')
  }, []);

  return (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: color,
      borderRadius: '8px',
    }}
  >
    {children}
  </Appointments.Appointment>
  )
}

export default Appointment