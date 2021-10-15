import {Link} from 'react-router-dom'
import {HiHome, HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {FaFacebook, FaTwitter, FaLinkedin} from 'react-icons/fa'
import {MdPlaylistAdd} from 'react-icons/md'
import './index.css'

const SideNav = () => (
  <div className="navigation-container">
    <ul className="ul-list-home">
      <Link to="/">
        <li className="li-class-container">
          <HiHome />
          <h1 className="heading-nav">Home</h1>
        </li>
      </Link>
      <Link to="/trending">
        <li className="li-class-container">
          <HiFire />
          <h1 className="heading-nav">Trending</h1>
        </li>
      </Link>
      <Link to="/gaming">
        <li className="li-class-container">
          <SiYoutubegaming />
          <h1 className="heading-nav">Gaming</h1>
        </li>
      </Link>
      <Link to="/saved-videos">
        <li className="li-class-container">
          <MdPlaylistAdd />
          <h1 className="heading-nav">Saved videos</h1>
        </li>
      </Link>
    </ul>
    <div className="contact-container">
      <h1 className="contact-heading">CONTACT US</h1>
      <ul className="ul-icon-list">
        <li className="li-icons">
          <FaFacebook className="facebook" />
        </li>
        <li className="li-icons">
          <FaTwitter className="twitter" />
        </li>
        <li className="li-icons">
          <FaLinkedin className="linkdin" />
        </li>
      </ul>
      <p className="description-contact">
        Enjoy! Now to see your channels and recommendations
      </p>
    </div>
  </div>
)

export default SideNav
