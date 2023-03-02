import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BookingDataService from "../../services/BookingService"
// import Booking from "../../services/BookingDataService"

const BookingDetail = props => {
  const { id } = useParams()
  let navigate = useNavigate()

  const initialBookingState = {
    id: null,
    name: "",
    date: "",
    time: "",
    address: ""
  }

  const [currentBooking, setCurrentBooking] = useState(initialBookingState)
  const [message, setMessage] = useState("")

  const getBooking = id => {
    BookingDataService.get(id)
      .then(response => {
        setCurrentBooking(response.data)
        console.log(response.data)
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

  const updateBooking = () => {
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
              <input 
                type="text"
                className="form-control"
                id="date"
                required
                value={currentBooking.date}
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
                value={currentBooking.time}
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
                value={currentBooking.address}
                onChange={handleInputChange}
                name="address"
              />
            </div>
          </form>

          <button
            className="badge badge-dange mr-2"
            onClick={deleteBooking}
          >Delete</button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBooking}
          >
            Update
          </button>
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