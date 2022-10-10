import { Link } from 'react-router-dom'
const NavbarHomePage = () => {
  return (
    <nav
      style={{ backgroundColor: '#db0f62' }}
      className='navbar navbar-expand-lg navbar-dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/home-page'>
          MovieBooking
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/home-page'>
                Home
              </Link>
            </li> 
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/update-profile'>
                Update Profile
              </Link>
            </li> 
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/delete-account'>
                Delete Account
              </Link>
            </li> 
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/view-profile'>
                View Profile
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/bookings'>
                Bookings
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/payments'>
                Payments
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/'>
                SignOut
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavbarHomePage
