import {Component} from 'react'
import ReactPlayer from 'react-player/youtube'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import NextWatchContext from '../../context/NextWatchContext'
import Header from '../Header'
import SideNav from '../SideNav'
import FailureView from '../FailureView'
import './index.css'

const stateSet = {
  start: 'START',
  success: 'SUCCESS',
  loading: 'LOADING',
  fail: 'FAIL',
}
class VideoItemDetails extends Component {
  state = {
    videoDetailsList: [],
    channelDetails: '',
    savedState: 'Save',
    isRequestSuccess: stateSet.start,
  }

  componentDidMount() {
    this.getVideoItemUrl()
  }

  getVideoItemUrl = async () => {
    this.setState({isRequestSuccess: stateSet.loading})
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

    if (apiRequest.ok === true) {
      const updatedVideoDetails = apiResponse.video_details
      const item = {
        id: updatedVideoDetails.id,
        title: updatedVideoDetails.title,
        videoUrl: updatedVideoDetails.video_url,
        thumbnailUrl: updatedVideoDetails.thumbnail_url,
        channel: updatedVideoDetails.channel,
        viewCount: updatedVideoDetails.view_count,
        publishedAt: updatedVideoDetails.published_at,
        description: updatedVideoDetails.description,
      }
      const updatedChannel = item.channel
      const newChannelDetails = {
        name: updatedChannel.name,
        profileImageUrl: updatedChannel.profile_image_url,
        subscriberCount: updatedChannel.subscriber_count,
      }
      this.setState({
        videoDetailsList: item,
        channelDetails: newChannelDetails,
        isRequestSuccess: stateSet.success,
      })
    } else {
      this.setState({
        isRequestSuccess: stateSet.fail,
      })
    }
  }

  renderVideoItemDetailsPage = () => {
    const {videoDetailsList, channelDetails, savedState} = this.state

    const {
      videoUrl,
      title,
      viewCount,
      publishedAt,
      description,
    } = videoDetailsList
    const {name, profileImageUrl, subscriberCount} = channelDetails
    console.log(savedState)
    return (
      <NextWatchContext.Consumer>
        {value => {
          const {updateSavedVideosL} = value
          const updateSavedVideosList = () => {
            if (savedState === 'Save') {
              this.setState(
                {
                  savedState: 'Saved',
                },
                updateSavedVideosL(videoDetailsList),
              )
            } else {
              this.setState(
                {savedState: 'Save'},
                updateSavedVideosL(videoDetailsList),
              )
            }
          }

          return (
            <div className="video-items-details-container">
              <ReactPlayer width="100%" height="50vh" url={videoUrl} />
              <div className="dis-play-content-section">
                <p className="video-heading">{title}</p>
                <div className="views-and-like-container">
                  <div className="views-and-date-container">
                    <p>{viewCount}</p>
                    <p>{publishedAt}</p>
                  </div>
                  <ul className="likes-list">
                    <li className="video-list-item">
                      <BiLike />
                      <button className="like-btn" type="button">
                        Like
                      </button>
                    </li>
                    <li className="video-list-item">
                      <BiDislike />
                      <button className="like-btn" type="button">
                        Dislike
                      </button>
                    </li>
                    <li className="video-list-item">
                      <MdPlaylistAdd />
                      <button
                        className="like-btn"
                        onClick={updateSavedVideosList}
                        type="button"
                      >
                        {savedState}
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="description-and-channel-container">
                  <img
                    src={profileImageUrl}
                    alt="profile"
                    className="channel-style"
                  />
                  <div className="channel-description-and-name">
                    <div className="channel-name-details">
                      <p>{name}</p>
                      <p>{subscriberCount}</p>
                    </div>
                    <p className="channel-desc">{description}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </NextWatchContext.Consumer>
    )
  }

  renderThisPageLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  renderThisPageCondition = () => {
    const {isRequestSuccess} = this.state
    switch (isRequestSuccess) {
      case stateSet.success:
        return this.renderVideoItemDetailsPage()
      case stateSet.fail:
        return <FailureView retryFunction={this.getVideoItemUrl} />
      case stateSet.loading:
        return this.renderThisPageLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-page-container">
          <SideNav />
          <div data-testid="videoItemDetails" className="content-display">
            {this.renderVideoItemDetailsPage()}
          </div>
        </div>
      </>
    )
  }
}

export default VideoItemDetails
