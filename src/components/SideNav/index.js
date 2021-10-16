import {Link} from 'react-router-dom'
import {HiHome, HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'

import {MdPlaylistAdd} from 'react-icons/md'
import './index.css'

const SideNav = () => (
  <div className="navigation-container">
    <ul className="ul-list-home">
      <Link className="link-class-style" to="/">
        <li className="li-class-container">
          <HiHome />
          <h1 className="heading-nav">Home</h1>
        </li>
      </Link>
      <Link className="link-class-style" to="/trending">
        <li className="li-class-container">
          <HiFire />
          <h1 className="heading-nav">Trending</h1>
        </li>
      </Link>
      <Link className="link-class-style" to="/gaming">
        <li className="li-class-container">
          <SiYoutubegaming />
          <h1 className="heading-nav">Gaming</h1>
        </li>
      </Link>
      <Link className="link-class-style" to="/saved-videos">
        <li className="li-class-container">
          <MdPlaylistAdd />
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
)

export default SideNav
