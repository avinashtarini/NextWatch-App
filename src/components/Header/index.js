import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import {BsSun} from 'react-icons/bs'

import NextWatchContext from '../../context/NextWatchContext'

import 'reactjs-popup/dist/index.css'
import './index.css'

const Header = props => {
  const getLoggedOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <NextWatchContext.Consumer>
      {value => {
        const {darkTheme, updateTheme} = value

        const changeToDarkTheme = () => {
          updateTheme()
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
                <div className="popup-desc">
                  <p>Are you sure, you want to logout?</p>
                </div>
                <button
                  type="button"
                  className="trigger-button"
                  onClick={() => close()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={getLoggedOut}
                  className="trigger-button"
                >
                  Confirm
                </button>
              </>
            )}
          </Popup>
        )

        const showThemeIcon = darkTheme ? (
          <BsSun className="theme-icons" />
        ) : (
          <FaMoon className="theme-icon-moon" />
        )
        const bgColor = darkTheme
          ? 'nav-container-top bg-color-header'
          : 'nav-container-top'
        const websiteLogoHeader = darkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        return (
          <nav className={bgColor}>
            <Link className="header-link-style" to="/">
              <img
                src={websiteLogoHeader}
                alt="website logo"
                className="website"
              />
            </Link>
            <div className="theme-container">
              <button
                data-testid="theme"
                type="button"
                className="theme-changer-btn"
                onClick={changeToDarkTheme}
              >
                {showThemeIcon}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile-photo"
              />
              <div>{reactPopup()}</div>
            </div>
          </nav>
        )
      }}
    </NextWatchContext.Consumer>
  )
}
export default withRouter(Header)
