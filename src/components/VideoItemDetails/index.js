import {Component} from 'react'
import Cookies from 'js-cookie'

class VideoItemDetails extends Component {
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
      }
    }
  }

  render() {
    return <h>hi</h>
  }
}

export default VideoItemDetails
