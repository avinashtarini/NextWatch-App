import {Link} from 'react-router-dom'
import './index.css'

const DisplayGamingVideos = props => {
  const {gamesListDetails} = props
  const {id, title, thumbnailUrl, viewCount} = gamesListDetails

  return (
    <Link to={`/videos/${id}`}>
      <div className="games-display-container">
        <img src={thumbnailUrl} alt="game" className="game-logo" />
        <p className="game-name">{title}</p>
        <p className="game-views">{viewCount}</p>
      </div>
    </Link>
  )
}
export default DisplayGamingVideos
