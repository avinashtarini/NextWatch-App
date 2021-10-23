import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'

import Loader from 'react-loader-spinner'
import DisplayGamingVideos from '../DisplayGamingVideos'
import Header from '../Header'
import SideNav from '../SideNav'
import NextWatchContext from '../../context/NextWatchContext'
import FailureView from '../FailureView'
import {GamingVideosContainer, MainHeadingGaming} from './styledComponent'

import './index.css'

const gamesLooking = {
  starting: 'START',
  loading: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}
class Gaming extends Component {
  state = {gamesList: [], gameDisplayStatus: gamesLooking.starting}

  componentDidMount() {
    this.getDataRequestGaming()
  }

  getDataRequestGaming = async () => {
    this.setState({gameDisplayStatus: gamesLooking.loading})

    const gameToken = Cookies.get('jwt_token')
    const gameBody = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${gameToken}`,
      },
    }
    const gamesRequest = await fetch(
      'https://apis.ccbp.in/videos/gaming',
      gameBody,
    )
    const gamesData = await gamesRequest.json()
    console.log(gamesData)
    if (gamesRequest.ok === true) {
      const gamingListVideos = gamesData.videos.map(eachGame => ({
        id: eachGame.id,
        title: eachGame.title,
        thumbnailUrl: eachGame.thumbnail_url,
        viewCount: eachGame.view_count,
      }))
      console.log(gamingListVideos)
      this.setState({
        gamesList: gamingListVideos,
        gameDisplayStatus: gamesLooking.success,
      })
    } else {
      this.setState({
        gameDisplayStatus: gamesLooking.fail,
      })
    }
  }

  renderGamingPageLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  renderGamingSuccessView = () => {
    const {gamesList} = this.state
    return (
      <>
        <div data-testid="banner" className="gaming-header">
          <SiYoutubegaming />
          <MainHeadingGaming>Gaming</MainHeadingGaming>
        </div>
        <div className="gaming-videos-container">
          {gamesList.map(eachGameVideo => (
            <DisplayGamingVideos
              key={eachGameVideo.id}
              gamesListDetails={eachGameVideo}
            />
          ))}
        </div>
      </>
    )
  }

  retryGamingPage = () => {
    this.getDataRequestGaming()
  }

  renderGamingFailureView = () => (
    <FailureView retryFunction={this.retryGamingPage} />
  )

  checkGamingStatus = darkTheme => {
    const {gameDisplayStatus} = this.state
    switch (gameDisplayStatus) {
      case gamesLooking.success:
        return this.renderGamingSuccessView()
      case gamesLooking.fail:
        return this.renderGamingFailureView(darkTheme)
      case gamesLooking.loading:
        return this.renderGamingPageLoader()
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
                <GamingVideosContainer
                  data-testid="gaming"
                  bgColor={trendingVideoBgColor}
                  textColor={trendingVideoTextClr}
                >
                  {this.checkGamingStatus(darkTheme)}
                </GamingVideosContainer>
              )
            }}
          </NextWatchContext.Consumer>
        </div>
      </>
    )
  }
}
export default Gaming
