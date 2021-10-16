import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'

import Loader from 'react-loader-spinner'
import DisplayGamingVideos from '../DisplayGamingVideos'
import Header from '../Header'
import SideNav from '../SideNav'
import FailureView from '../FailureView'

import './index.css'

const gamesStatus = {
  starting: 'START',
  loading: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}
class Gaming extends Component {
  state = {gamesList: [], gameDisplayStatus: gamesStatus.starting}

  componentDidMount() {
    this.getDataRequestGaming()
  }

  getDataRequestGaming = async () => {
    this.setState({gameDisplayStatus: gamesStatus.loading})

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
        gameDisplayStatus: gamesStatus.success,
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
        <div className="gaming-header">
          <SiYoutubegaming />
          <h1 className="gaming-heading">Gaming</h1>
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

  checkGamingStatus = () => {
    const {gameDisplayStatus} = this.state
    switch (gameDisplayStatus) {
      case gamesStatus.success:
        return this.renderGamingSuccessView()
      case gamesStatus.fail:
        return this.renderGamingFailureView()
      case gamesStatus.loading:
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
          <div data-testid="gaming" className="content-display-games">
            {this.checkGamingStatus()}
          </div>
        </div>
      </>
    )
  }
}
export default Gaming
