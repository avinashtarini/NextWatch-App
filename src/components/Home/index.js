import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiSearchAlt2} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import DisplayVideos from '../DisplayVideos'
import SideNav from '../SideNav'
import Header from '../Header'

import './index.css'
import FailureView from '../FailureView'

const homeStatus = {
  starting: 'START',
  loading: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class Home extends Component {
  state = {searchInput: '', videoList: [], requestStatus: homeStatus.starting}

  componentDidMount() {
    this.getHomePageRequest()
  }

  getHomePageRequest = async () => {
    this.setState({requestStatus: homeStatus.loading})
    const {searchInput} = this.state
    const token = Cookies.get('jwt_token')
    const requestOption = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const homePageResponse = await fetch(
      `https://apis.ccbp.in/videos/all?search=${searchInput}`,
      requestOption,
    )
    const dataJson = await homePageResponse.json()
    console.log(homePageResponse)
    console.log(dataJson)
    if (homePageResponse.ok === true) {
      const updatedVideos = dataJson.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        channel: eachVideo.channel,
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
      }))
      this.setState({
        requestStatus: homeStatus.success,
        videoList: updatedVideos,
      })
    } else {
      this.setState({
        requestStatus: homeStatus.fail,
      })
    }
  }

  renderHomePageSuccessView = () => {
    const {videoList} = this.state
    return (
      <div className="video-display-container">
        {videoList.map(eachList => (
          <DisplayVideos key={eachList.id} videoData={eachList} />
        ))}
      </div>
    )
  }

  retryHomePage = () => {
    this.getHomePageRequest()
  }

  renderHomePageFailureView = () => (
    <FailureView retryFunction={this.retryHomePage} />
  )

  renderHomePageLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  renderSwitchCase = () => {
    const {requestStatus} = this.state
    switch (requestStatus) {
      case homeStatus.success:
        return this.renderHomePageSuccessView()
      case homeStatus.fail:
        return this.renderHomePageFailureView()
      case homeStatus.loading:
        return this.renderHomePageLoader()
      default:
        return null
    }
  }

  searchFunction = event => {
    if (event.key === 'Enter') {
      return this.getHomePageRequest()
    }
    return null
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-page-container">
          <SideNav />
          <div className="content-display">
            <div className="search-container">
              <input
                onChange={this.updateSearchInput}
                onKeyDown={this.searchFunction}
                type="search"
                className="search-input"
              />
              <button
                data-testid="searchButton"
                type="button"
                className="search-btn"
                onClick={this.retryHomePage}
              >
                <BiSearchAlt2 />
              </button>
            </div>
            {this.renderSwitchCase()}
          </div>
        </div>
      </>
    )
  }
}

export default Home
