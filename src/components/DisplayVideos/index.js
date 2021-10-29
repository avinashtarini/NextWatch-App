import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const DisplayVideos = props => {
  const {videoData} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = videoData
  const updatedDetailsList = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }
  const newDate = formatDistanceToNow(new Date(publishedAt))
  const {name, profileImageUrl} = updatedDetailsList
  return (
    <Link className="link-style" to={`/videos/${id}`}>
      <div className="video-data-list">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="thumbnail-style"
        />
        <div className="description-container">
          <img
            src={profileImageUrl}
            alt="channel logo"
            className="profile-channel-icon"
          />
          <div className="more-info">
            <p className="video-title">{title}</p>
            <p className="channel-name">{name}</p>
            <div className="view-container">
              <p className="views-count-text">{viewCount}</p>
              <p>{newDate}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default DisplayVideos
