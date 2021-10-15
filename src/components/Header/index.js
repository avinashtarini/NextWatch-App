import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'

import 'reactjs-popup/dist/index.css'
import './index.css'

const Header = props => {
  const getLoggedOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const reactPopup = () => (
    <Popup
      modal
      trigger={
        <button className="logout-button" type="button">
          Logout
        </button>
      }
      className="popup-content"
    >
      {close => (
        <>
          <div>
            <p>Are you sure, you want to logout?</p>
          </div>
          <button
            type="button"
            className="trigger-button"
            onClick={() => close()}
          >
            Cancel
          </button>
          <button type="button" onClick={getLoggedOut} className="confirm-btn">
            Confirm
          </button>
        </>
      )}
    </Popup>
  )

  return (
    <nav className="nav-container-top">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          className="website"
        />
      </Link>
      <div className="theme-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          className="profile-photo"
        />
        <div>{reactPopup()}</div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
