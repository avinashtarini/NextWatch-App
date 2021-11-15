import {Link} from 'react-router-dom'
import {HiHome, HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import NextWatchContext from '../../context/NextWatchContext'

import './index.css'

const SideNav = () => (
  <NextWatchContext.Consumer>
    {value => {
      const {darkTheme} = value
      const themeClass = darkTheme
        ? 'navigation-container bg-color-side-nav'
        : 'navigation-container'
      const mobileTheme = darkTheme
        ? 'mobile-nav-style dark'
        : 'mobile-nav-style'
      return (
        <>
          <div className={themeClass}>
            <ul className="ul-list-home">
              <Link className="nav-link-style" to="/">
                <li className="li-class-container">
                  <HiHome className="side-icon" />
                  <h1 className="heading-nav">Home</h1>
                </li>
              </Link>
              <Link className="nav-link-style" to="/trending">
                <li className="li-class-container">
                  <HiFire className="side-icon" />
                  <h1 className="heading-nav">Trending</h1>
                </li>
              </Link>
              <Link className="nav-link-style" to="/gaming">
                <li className="li-class-container">
                  <SiYoutubegaming className="side-icon" />
                  <h1 className="heading-nav">Gaming</h1>
                </li>
              </Link>
              <Link className="nav-link-style" to="/saved-videos">
                <li className="li-class-container">
                  <MdPlaylistAdd className="side-icon" />
                  <h1 className="heading-nav">Saved videos</h1>
                </li>
              </Link>
            </ul>
            <div className="contact-container">
              <p className="contact-heading">CONTACT US</p>
              <ul className="ul-icon-list">
                <li className="li-icons">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="facebook"
                  />
                </li>
                <li className="li-icons">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="twitter"
                  />
                </li>
                <li className="li-icons">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="linkdin"
                  />
                </li>
              </ul>
              <p className="description-contact">
                Enjoy! Now to see your channels and recommendations!
              </p>
            </div>
          </div>
          <div className={mobileTheme}>
            <ul className="ul-mobile">
              <Link className="nav-link-style" to="/">
                <li className="li-mobile">Home</li>
              </Link>
              <Link className="nav-link-style" to="/trending">
                <li className="li-mobile">Trending</li>
              </Link>
              <Link className="nav-link-style" to="/gaming">
                <li className="li-mobile">Gaming</li>
              </Link>
              <Link className="nav-link-style" to="/saved-videos">
                <li className="li-mobile">Saved Videos</li>
              </Link>
            </ul>
          </div>
        </>
      )
    }}
  </NextWatchContext.Consumer>
)

export default SideNav
