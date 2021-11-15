import {Component} from 'react'
import ReactPlayer from 'react-player/'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import NextWatchContext from '../../context/NextWatchContext'
import Header from '../Header'
import SideNav from '../SideNav'
import FailureView from '../FailureView'
import {VideosItemsDetailsContainer, ButtonContainer} from './styledComponent'

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

  renderVideoItemDetailsPage = (updateSavedVideosL, isSavedTextState) => {
    const {
      videoDetailsList,
      channelDetails,
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
    const likeStyle = isLikeActive ? '#2563eb' : '#64748b'
    const disLikeStyle = idDisLikeActive ? '#2563eb' : '#64748b'
    console.log(isSavedTextState)
    const updateSavedVideosList = () => {
      updateSavedVideosL(videoDetailsList)
    }

    return (
      <div className="video-items-details-container">
        <ReactPlayer url={videoURL} width="100%" height="40vh" />
        <div className="dis-play-content-section">
          <p className="video-heading">{title}</p>
          <div className="views-and-like-container">
            <div className="views-and-date-container">
              <p className="count">{viewCount}</p>
              <p>{publishedAt}</p>
            </div>
            <ul className="likes-list">
              <li className="video-list-item">
                <ButtonContainer
                  onClick={this.changeLikeActive}
                  buttonColor={likeStyle}
                  type="button"
                  className="like-btn"
                >
                  <BiLike />
                  Like
                </ButtonContainer>
              </li>
              <li className="video-list-item">
                <ButtonContainer
                  buttonColor={disLikeStyle}
                  type="button"
                  className="like-btn"
                  onClick={this.changeDislikeActive}
                >
                  <BiDislike /> Dislike
                </ButtonContainer>
              </li>
              <li className="video-list-item">
                <button
                  className="like-btn"
                  onClick={updateSavedVideosList}
                  type="button"
                >
                  <MdPlaylistAdd /> {isSavedTextState}
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
                <p className="channel-name-l">{name}</p>
                <p className="channel-name-l">{subscriberCount}</p>
              </div>
              <p className="channel-desc">{description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderThisVideoPageLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  retryVideoDetailsPage = () => {
    this.getVideoItemUrl()
  }

  renderVideItemDetailsFailureView = () => (
    <FailureView retryFunction={this.retryVideoDetailsPage} />
  )

  renderThisPageCondition = (updateSavedVideosL, isSavedTextState) => {
    const {isRequestSuccessVideoItems} = this.state
    switch (isRequestSuccessVideoItems) {
      case videoItemDetailsState.success:
        return this.renderVideoItemDetailsPage(
          updateSavedVideosL,
          isSavedTextState,
        )
      case videoItemDetailsState.fail:
        return this.renderVideItemDetailsFailureView()
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
              const {darkTheme, isSavedTextState, updateSavedVideosL} = value
              const VideoItemDetailsBgColor = darkTheme ? '#0f0f0f' : '#f9f9f9'
              const VideoItemDetailsTextClr = darkTheme ? '#ffffff' : '#000000'

              return (
                <VideosItemsDetailsContainer
                  data-testid="videoItemDetails"
                  bgColor={VideoItemDetailsBgColor}
                  textColor={VideoItemDetailsTextClr}
                >
                  {this.renderThisPageCondition(
                    updateSavedVideosL,
                    isSavedTextState,
                  )}
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
