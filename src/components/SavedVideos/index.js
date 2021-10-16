import {Component} from 'react'
import NextWatchContext from '../../context/NextWatchContext'
import DisplaySavedVideos from '../DisplaySavedVideos'
import Header from '../Header'
import SideNav from '../SideNav'

import './index.css'

class SavedVideos extends Component {
  renderNoSavedVideos = () => (
    <div className="saved-empty-list">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="no-saved"
      />
      <h1>No saved videos found</h1>
      <p>You can save your videos while watching them</p>
    </div>
  )

  renderSavedVideosPage = () => (
    <NextWatchContext.Consumer>
      {value => {
        const {savedVideosList} = value

        // const savedVideosClass = darkTheme ? 'dark' : 'light'
        const savedVideoLength = savedVideosList.length
        if (savedVideoLength > 0) {
          return (
            <>
              {savedVideosList.length !== 0
                ? savedVideosList.map(eachSave => (
                    <DisplaySavedVideos
                      key={eachSave.id}
                      savedVideoData={eachSave}
                    />
                  ))
                : null}
            </>
          )
        }
        return this.renderNoSavedVideos()
      }}
    </NextWatchContext.Consumer>
  )

  render() {
    return (
      <>
        <Header />
        <div className="home-page-container">
          <SideNav />
          <div data-testid="savedVideos " className="content-display">
            <h1 className="save-heading">Saved Videos</h1>
            {this.renderSavedVideosPage()}
          </div>
        </div>
      </>
    )
  }
}
export default SavedVideos
