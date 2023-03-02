import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import BookingDataService from "../../services/BookingService";

const BookingList = () => {
  const [bookings, setBookings] = useState([])
  const [currentBooking, setCurrentBooking] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [searchName, setSearchName] = useState("")

  useEffect(() => {
    retrieveBookings();
  }, [])

  const retrieveBookings = () => {
    BookingDataService.getAll()
      .then(response => {
        setBookings(response.data)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const onChangeSearchName = e => {
    const searchName = e.target.value
    setSearchName(searchName)
  }

  const refreshList = () => {
    retrieveBookings()
    setCurrentBooking(null)
    setCurrentIndex(-1)
  }

  const setActiveBooking = (booking, index) => {
    setCurrentBooking(booking)
    setCurrentIndex(index)
  }

  const findByName = () => {
    BookingDataService.findByName(searchName)
      .then(response => {
        setBookings(response.data);
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  return(
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          {/* Here goes the searching */}
        </div>
      </div>
      <div className="col-md-6">
        <h4>Booking List</h4>
        {bookings &&
          bookings.map( (booking, index) => (
            <li
              className="list-group-item"
              key={index}
              onClick={() => setActiveBooking(booking, index)}
              >
              {booking.name} {booking.date} {booking.time}
            </li>
          ))
          }
      </div>
      <div className="col-md-6">
        {currentBooking ? (
          <div>
            <h4>Booking</h4>
            <div>
              <label><strong>Name:</strong></label>{" "}{currentBooking.name}
            </div>
            <div>
              <label><strong>Date:</strong></label>{" "}{currentBooking.date}
            </div>
            <div>
              <label><strong>Time:</strong></label>{" "}{currentBooking.time}
            </div>
            <div>
              <label><strong>Address:</strong></label>{" "}{currentBooking.address}
            </div>
            <Link
              to={"/bookings/" + currentBooking.id}
              className="btn btn-warning"
            >
            Edit
            </Link>
          </div>
        ): (
          <div>
            <br />
            <p>Please click on a Booking...</p>
          </div>
        )}
      </div>
    </div>
  )

}

export default BookingList;