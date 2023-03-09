import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BookingDataService from "../../services/BookingService"
import * as React from "react";
import dayjs from "dayjs";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker'

const styles = {
  button: {
    margin: '5px'
  }
}

const BookingDetail = props => {
  const { id } = useParams()
  let navigate = useNavigate()

  const initialBookingState = {
    id: null,
    name: "",
    date: "",
    time: "",
    hours: 2,
    address: ""
  }

  const [currentBooking, setCurrentBooking] = useState(initialBookingState)
  const [message, setMessage] = useState("")
  const [date, setDate] = useState(null)
  const [time, setTime] = useState("")

  const getBooking = id => {
    BookingDataService.get(id)
      .then(response => {
        setCurrentBooking(response.data)
        setDate(dayjs(response.data.date).$d)
        setTime(response.data.time.substr(0,5))
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    if (id)
      getBooking(id);
  }, [id])

  const handleInputChange = event => {
    const { name, value } = event.target
    setCurrentBooking({...currentBooking, [name]: value})
  }

  const goBookings = () => {
    navigate("/bookings")
  }

  const updateBooking = () => {
    currentBooking.date = date
    currentBooking.time = time
    console.log(currentBooking)
    BookingDataService.update(currentBooking.id, currentBooking)
      .then(response => {
        console.log(response.data)
        setMessage("The booking was updated successfully")
      })
      .catch(e => {
        console.log(e)
      })
  }

  const deleteBooking = () => {
    BookingDataService.remove(currentBooking.id)
      .then(response => {
        console.log(response.data)
        navigate('/bookings')
      })
      .catch(e => {
        console.log(e)
      })
  }

  return(
    <div>
      {currentBooking ? (
        <div className="edit-form">
          <h4>Booking</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text"
                className="form-control"
                id="name"
                required
                value={currentBooking.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <br />
              <DatePicker 
              selected={date} 
              className="form-control"
              onChange={(date) => setDate(date)} />
            </div>


            <div className="form-group">
              <label htmlFor="time">Time</label>
              <br />
              <TimePicker
              disableClock={true}
              className="form-control"
              format="HH:mm"
              onChange={setTime} 
              value={time} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="hours">Hours</label>
              <input 
                type="text"
                className="form-control"
                id="hours"
                required
                value={currentBooking.hours}
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
                value={currentBooking.address}
                onChange={handleInputChange}
                name="address"
              />
            </div>
          </form>

          <br />  
          
          <button
            className="btn btn-primary"
            onClick={goBookings}
            style={styles.button}
          >Go Bookings</button>


          <button
            type="submit"
            className="btn btn-warning"
            onClick={updateBooking}
            style={styles.button}
          >
            Update
          </button>
          
          <button
            className="btn btn-danger"
            onClick={deleteBooking}
            style={styles.button}
          >Delete</button>

          <p>{message}</p>
        </div>
      ): (
        <div>
          <br />
          <p>Please select a Booking</p>
        </div>
      )}
    </div>
  )
}

export default BookingDetail