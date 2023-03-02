import http from "../constants/http-common"

const BOOKING_URL = '/bookings'

const getAll = () => {
  return http.get(BOOKING_URL)
}

const get = id => {
  return http.get(`${BOOKING_URL}/${id}`)
}

const create = data => {
  return http.post(`${BOOKING_URL}`, data)
}

const update = (id, data) => {
  return http.put(`${BOOKING_URL}/${id}`, data)
}

const remove = id => {
  return http.delete(`${BOOKING_URL}/${id}`)
}

const BookingService = {
  getAll,
  get,
  create,
  update,
  remove
}

export default BookingService