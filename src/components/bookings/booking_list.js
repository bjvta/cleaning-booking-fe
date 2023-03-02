import { useEffect, useState } from "react"

const BookingList = () => {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    retrieveBookings();
  }, [])

  const retrieveBookings = () => {
    let data = [{id: 1, name: 'Maria Perez', date: '2022/01/01', time: '15:30', address: '404 W'}]
    setBookings(data)
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
              >
              {booking.name}
            </li>
          ))
          }
      </div>
    </div>
  )

}

export default BookingList;