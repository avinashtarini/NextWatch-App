import {Link} from 'react-router-dom'

const DisplaySavedVideos = props => {
  const {savedVideoData} = props
  const {
    id,
    title,
    thumbnailUrl,
    channel,
    viewCount,
    publishedAt,
  } = savedVideoData
  const updatedChannelVideos = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }
  const {name} = updatedChannelVideos
  return (
    <Link className="link-class-style" to={`/videos/${id}`}>
      <div>
        <img src={thumbnailUrl} alt="video thumbnail" />
        <div>
          <p>{title}</p>
          <p>{name}</p>
          <div>
            <p>{viewCount}</p>
            <p>{publishedAt}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default DisplaySavedVideos
