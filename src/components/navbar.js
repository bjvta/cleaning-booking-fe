import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Home
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/bookings"} className="nav-link">
              Bookings
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/bookings/new"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
  )
}