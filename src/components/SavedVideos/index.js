import {Component} from 'react'
import NextWatchContext from '../../context/NextWatchContext'
import DisplaySavedVideos from '../DisplaySavedVideos'
import {SavedVideosContainer} from './styledComponent'

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
          <NextWatchContext.Consumer>
            {value => {
              const {darkTheme} = value
              const saveVideoBgColor = darkTheme ? '#0f0f0f' : '#f9f9f9'
              const saveVideoTextClr = darkTheme ? '#ffffff' : '#000000'

              return (
                <SavedVideosContainer
                  data-testid="savedVideos "
                  bgColor={saveVideoBgColor}
                  textColor={saveVideoTextClr}
                >
                  <h1 className="save-heading">Saved Videos</h1>
                  {this.renderSavedVideosPage()}
                </SavedVideosContainer>
              )
            }}
          </NextWatchContext.Consumer>
        </div>
      </>
    )
  }
}
export default SavedVideos
