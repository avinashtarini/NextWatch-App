import Header from '../Header'
import SideNav from '../SideNav'

const NotFound = () => (
  <>
    <Header />
    <div className="home-page-container">
      <SideNav />
      <div className="content-display">
        <div className="notfound-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
            alt="not found"
            className="not-found"
          />
          <h1>Page Not Found</h1>
          <p>we are sorry, the page you requested could not be found.</p>
        </div>
      </div>
    </div>
  </>
)

export default NotFound
