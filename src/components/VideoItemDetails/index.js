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
import {VideosItemsDetailsContainer} from './styledComponent'

import './index.css'

const videoItemDetailsState = {
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
    isLikeActive: false,
    idDisLikeActive: false,
    isRequestSuccessVideoItems: videoItemDetailsState.start,
  }

  componentDidMount() {
    this.getVideoItemUrl()
  }

  getVideoItemUrl = async () => {
    this.setState({
      isRequestSuccessVideoItems: videoItemDetailsState.loading,
    })
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
        videoURL: updatedVideoDetails.video_url,
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
        isRequestSuccessVideoItems: videoItemDetailsState.success,
      })
    } else {
      this.setState({
        isRequestSuccessVideoItems: videoItemDetailsState.fail,
      })
    }
  }

  changeLikeActive = () => {
    this.setState(prevLike => ({isLikeActive: !prevLike.isLikeActive}))
    this.setState({idDisLikeActive: false})
  }

  changeDislikeActive = () => {
    this.setState(prevDisLike => ({
      idDisLikeActive: !prevDisLike.idDisLikeActive,
    }))
    this.setState({isLikeActive: false})
  }

  renderVideoItemDetailsPage = () => {
    const {
      videoDetailsList,
      channelDetails,
      savedState,
      idDisLikeActive,
      isLikeActive,
    } = this.state

    const {
      videoURL,
      title,
      viewCount,
      publishedAt,
      description,
    } = videoDetailsList
    const {name, profileImageUrl, subscriberCount} = channelDetails
    const likeStyle = isLikeActive ? 'like-btn active-style-like' : 'like-btn'
    const disLikeStyle = idDisLikeActive
      ? 'like-btn active-style-like'
      : 'like-btn'

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
              <ReactPlayer width="100%" height="50vh" url={videoURL} />
              <div className="dis-play-content-section">
                <p className="video-heading">{title}</p>
                <div className="views-and-like-container">
                  <div className="views-and-date-container">
                    <p>{viewCount}</p>
                    <p>{publishedAt}</p>
                  </div>
                  <ul className="likes-list">
                    <li className="video-list-item">
                      <button
                        onClick={this.changeLikeActive}
                        className={likeStyle}
                        type="button"
                      >
                        <BiLike />
                        Like
                      </button>
                    </li>
                    <li className="video-list-item">
                      <button
                        className={disLikeStyle}
                        type="button"
                        onClick={this.changeDislikeActive}
                      >
                        <BiDislike /> Dislike
                      </button>
                    </li>
                    <li className="video-list-item">
                      <button
                        className="like-btn"
                        onClick={updateSavedVideosList}
                        type="button"
                      >
                        <MdPlaylistAdd /> {savedState}
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="description-and-channel-container">
                  <img
                    src={profileImageUrl}
                    alt="channel logo"
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

  renderThisVideoPageLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  renderThisPageCondition = () => {
    const {isRequestSuccessVideoItems} = this.state
    switch (isRequestSuccessVideoItems) {
      case videoItemDetailsState.success:
        return this.renderVideoItemDetailsPage()
      case videoItemDetailsState.fail:
        return <FailureView retryFunction={this.getVideoItemUrl} />
      case videoItemDetailsState.loading:
        return this.renderThisVideoPageLoader()
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
          <NextWatchContext.Consumer>
            {value => {
              const {darkTheme} = value
              const VideoItemDetailsBgColor = darkTheme ? '#0f0f0f' : '#f9f9f9'
              const VideoItemDetailsTextClr = darkTheme ? '#ffffff' : '#000000'

              return (
                <VideosItemsDetailsContainer
                  data-testid="videoItemDetails"
                  bgColor={VideoItemDetailsBgColor}
                  textColor={VideoItemDetailsTextClr}
                >
                  {this.renderThisPageCondition()}
                </VideosItemsDetailsContainer>
              )
            }}
          </NextWatchContext.Consumer>
        </div>
      </>
    )
  }
}

export default VideoItemDetails
