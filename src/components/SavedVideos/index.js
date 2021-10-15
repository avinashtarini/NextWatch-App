import {Component} from 'react'
import NextWatchContext from '../../context/NextWatchContext'
import DisplaySavedVideos from '../DisplaySavedVideos'
import Header from '../Header'
import SideNav from '../SideNav'

class SavedVideos extends Component {
  render() {
    return (
      <NextWatchContext.Consumer>
        {value => {
          const {darkTheme, savedVideosList} = value

          const savedVideosClass = darkTheme ? 'dark' : 'light'
          return (
            <>
              <Header />
              <div className="home-page-container">
                <SideNav />
                <div className="content-display">
                  <h1 className="save-heading">Saved Videos</h1>
                  {savedVideosList.length !== 0
                    ? savedVideosList.map(eachSave => (
                        <DisplaySavedVideos
                          key={eachSave.id}
                          savedVideoData={eachSave}
                        />
                      ))
                    : null}
                </div>
              </div>
            </>
          )
        }}
      </NextWatchContext.Consumer>
    )
  }
}
export default SavedVideos
