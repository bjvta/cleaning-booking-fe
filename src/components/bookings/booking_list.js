import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import BookingDataService from "../../services/BookingService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
      {/* <div className="col-md-8">
        <div className="input-group mb-3">
          Here goes the searching
        </div>
      </div> */}
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
              <label><strong>Hours:</strong></label>{" "}{currentBooking.hours}
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

      <div className="col-md-12">
        <h4>Booking List</h4>
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">Hours</TableCell>
                  {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings && bookings.map((booking) => (
                  <TableRow
                    key={booking.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => setActiveBooking(booking, booking.id)}
                  >
                    <TableCell component="th" scope="row">{booking.id}</TableCell>
                    <TableCell component="th" scope="row">{booking.name}</TableCell>
                    <TableCell align="right">{booking.date}</TableCell>
                    <TableCell align="right">{booking.time}</TableCell>
                    <TableCell align="right">{booking.hours}</TableCell>
                    {/* <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </div>
      </div>
    </div>
  )

}

export default BookingList;