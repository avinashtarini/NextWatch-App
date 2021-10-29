import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'
import DisplayTrendingVideos from '../DisplayTrendingVideos'
import Header from '../Header'
import SideNav from '../SideNav'
import FailureView from '../FailureView'
import NextWatchContext from '../../context/NextWatchContext'
import {TrendingVideosContainer, MainHeadingTrending} from './styledComponent'

import './index.css'

const trends = {
  starting: 'START',
  loading: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}
class Trending extends Component {
  state = {trendingList: [], trendingStatus: trends.starting}

  componentDidMount() {
    this.getDataRequestTrending()
  }

  getDataRequestTrending = async () => {
    this.setState({trendingStatus: trends.loading})

    const accessToken = Cookies.get('jwt_token')
    const bodyDetails = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const trendingRequest = await fetch(
      'https://apis.ccbp.in/videos/trending',
      bodyDetails,
    )
    const trendingData = await trendingRequest.json()
    console.log(trendingData)
    if (trendingRequest.ok === true) {
      const trendingVideos = trendingData.videos.map(eachTrend => ({
        id: eachTrend.id,
        title: eachTrend.title,
        thumbnailUrl: eachTrend.thumbnail_url,
        channel: eachTrend.channel,
        viewCount: eachTrend.view_count,
        publishedAt: eachTrend.published_at,
      }))
      console.log(trendingVideos)
      this.setState({
        trendingList: trendingVideos,
        trendingStatus: trends.success,
      })
    } else {
      this.setState({
        trendingStatus: trends.fail,
      })
    }
  }

  renderTrendingPageLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color=" #4f46e5" height="50" width="50" />
    </div>
  )

  renderTrendingSuccessView = () => {
    const {trendingList} = this.state
    return (
      <>
        <div data-testid="banner" className="top-main-heading-container">
          <HiFire />
          <MainHeadingTrending>Trending</MainHeadingTrending>
        </div>
        <div className="trending-videos-container">
          {trendingList.map(eachTrendVideo => (
            <DisplayTrendingVideos
              key={eachTrendVideo.id}
              videosListDetails={eachTrendVideo}
            />
          ))}
        </div>
      </>
    )
  }

  retryTrendingPage = () => {
    this.getDataRequestTrending()
  }

  renderTrendingFailureView = () => (
    <FailureView retryFunction={this.retryTrendingPage} />
  )

  checkTrendingStatus = () => {
    const {trendingStatus} = this.state
    switch (trendingStatus) {
      case trends.success:
        return this.renderTrendingSuccessView()
      case trends.fail:
        return this.renderTrendingFailureView()
      case trends.loading:
        return this.renderTrendingPageLoader()
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
              const trendingVideoBgColor = darkTheme ? '#0f0f0f' : '#f9f9f9'
              const trendingVideoTextClr = darkTheme ? '#ffffff' : '#000000'

              return (
                <TrendingVideosContainer
                  data-testid="trending"
                  bgColor={trendingVideoBgColor}
                  textColor={trendingVideoTextClr}
                >
                  {this.checkTrendingStatus()}
                </TrendingVideosContainer>
              )
            }}
          </NextWatchContext.Consumer>
        </div>
      </>
    )
  }
}
export default Trending
