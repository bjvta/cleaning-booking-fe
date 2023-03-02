import { useState } from "react"
import BookingDataService from "../../services/BookingService"

const BookingNew = () => {
  const initialBookingState = {
    id: null,
    name: "",
    date: "",
    time: "",
    address: ""
  }

  const [booking, setBooking] = useState(initialBookingState)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = event => {
    const { name, value } = event.target
    setBooking({ ...booking, [name]: value })
  }

  const saveBooking = () => {
    let data = {
      name: booking.name,
      date: booking.date,
      time: booking.time,
      address: booking.address
    }

    BookingDataService.create(data)
      .then(response => {
        setBooking({
          id: response.data.id,
          name: response.data.name,
          date: response.data.date,
          time: response.data.time,
          address: response.data.address,
        });
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
            <input 
              type="text"
              className="form-control"
              id="date"
              required
              value={booking.date}
              onChange={handleInputChange}
              name="date"
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input 
              type="text"
              className="form-control"
              id="time"
              required
              value={booking.time}
              onChange={handleInputChange}
              name="time"
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