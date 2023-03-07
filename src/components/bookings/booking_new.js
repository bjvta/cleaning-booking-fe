import { useState } from "react"
import * as React from 'react';
import BookingDataService from "../../services/BookingService"
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import moment from "moment";


const BookingNew = () => {
  const initialBookingState = {
    id: null,
    name: "",
    date: "",
    time: "",
    hours: 2,
    address: ""
  }

  const [booking, setBooking] = useState(initialBookingState)
  const [submitted, setSubmitted] = useState(false)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)

  const handleInputChange = event => {
    const { name, value } = event.target
    setBooking({ ...booking, [name]: value })
  }

  const saveBooking = () => {
    let data = {
      name: booking.name,
      date: date,
      time: moment(time.$d).format('HH:mm'),
      address: booking.address
    }

    BookingDataService.create(data)
      .then(response => {
        setBooking({
          id: response.data.id,
          name: response.data.name,
          date: response.data.date,
          time: response.data.time,
          hours: response.data.hours,
          address: response.data.address,
        });
        setDate(response.data.date)
        setTime(response.data.time)
        setSubmitted(true)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const newBooking = () => {
    setBooking(initialBookingState)
    setSubmitted(false)
  }

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully</h4>
          <button
            className="btn btn-success"
            onClick={newBooking}  
          >Add</button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text"
              className="form-control"
              id="name"
              required
              value={booking.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                className="form-control"
                name="date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimeField']}>
                <TimeField
                  className="form-control"
                  label="Time"
                  value={time}
                  onChange={(newValue) => setTime(newValue)}
                  format="HH:mm"
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div className="form-group">
            <label htmlFor="hours">Hours</label>
            <input 
              type="text"
              className="form-control"
              id="hours"
              required
              value={booking.hours}
              onChange={handleInputChange}
              name="hours"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input 
              type="text"
              className="form-control"
              id="address"
              required
              value={booking.address}
              onChange={handleInputChange}
              name="address"
            />
          </div>

          <button
            onClick={saveBooking}
            className="btn btn-success"
          >Submit</button>
        </div>
      )}
    </div>
  )
}

export default BookingNew