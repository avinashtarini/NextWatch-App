const DisplaySavedVideos = props => {
  const {savedVideoData} = props
  const {title, thumbnailUrl, channel, viewCount, publishedAt} = savedVideoData
  const updatedChannelVideos = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }
  const {name} = updatedChannelVideos
  return (
    <div>
      <img src={thumbnailUrl} alt="saved video" />
      <div>
        <h1>{title}</h1>
        <p>{name}</p>
        <div>
          <p>{viewCount}</p>
          <p>{publishedAt}</p>
        </div>
      </div>
    </div>
  )
}

export default DisplaySavedVideos
