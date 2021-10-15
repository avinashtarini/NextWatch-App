import {Link} from 'react-router-dom'
import './index.css'

const DisplayTrendingVideos = props => {
  const {videosListDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    channel,
    viewCount,
    publishedAt,
  } = videosListDetails
  const updatedChannel = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }
  const {name} = updatedChannel
  return (
    <Link to={`/videos/${id}`}>
      <div className="video-data-list-games">
        <img src={thumbnailUrl} alt="thumb" className="thumbnail" />
        <div className="trending-videos-details-container">
          <h1 className="video-name">{title}</h1>
          <p className="channel-name">{name}</p>
          <div className="video-views-container-trending">
            <p>{viewCount}</p>
            <p>{publishedAt}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default DisplayTrendingVideos
