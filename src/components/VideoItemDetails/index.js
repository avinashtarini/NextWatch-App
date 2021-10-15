import {Component} from 'react'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'

class VideoItemDetails extends Component {
  state = {videoDetailsList: [], listA: []}

  componentDidMount() {
    this.getVideoItemUrl()
  }

  getVideoItemUrl = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const videoToken = Cookies.get('jwt_token')
    const videoOption = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${videoToken}`,
      },
    }
    const apiRequest = await fetch(
      `https://apis.ccbp.in/videos/${id}`,
      videoOption,
    )
    const apiResponse = await apiRequest.json()
    console.log(apiRequest)
    console.log(apiResponse)
    if (apiRequest.ok === true) {
      const newVideoDetails = {
        videoDetails: apiResponse.video_details,
        channel: apiResponse.channel,
        viewCount: apiResponse.view_count,
        publishedAt: apiResponse.published_at,
        description: apiResponse.description,
      }
      const updatedVideoDetails = newVideoDetails.videoDetails
      const item = {
        id: updatedVideoDetails.id,
        title: updatedVideoDetails.title,
        videoUrl: updatedVideoDetails.video_url,
        thumbnailUrl: updatedVideoDetails.thumbnail_url,
      }
      this.setState({videoDetailsList: newVideoDetails, listA: item})
    }
  }

  render() {
    const {listA} = this.state
    const {videoUrl} = listA

    return (
      <div>
        <ReactPlayer url={videoUrl} />
      </div>
    )
  }
}

export default VideoItemDetails
