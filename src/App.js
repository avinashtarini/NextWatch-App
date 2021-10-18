import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import NotFound from './components/NotFound'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import WrappedComponent from './components/WrappedComponent'
import NextWatchContext from './context/NextWatchContext'
import './App.css'

// Replace your code here
class App extends Component {
  state = {
    darkTheme: false,
    savedVideosList: '',
  }

  updateTheme = () => {
    this.setState(prevState => ({darkTheme: !prevState.darkTheme}))
  }

  updateSavedVideosL = videoSave => {
    const {savedVideosList} = this.state
    console.log(savedVideosList)
    const condition = savedVideosList.includes(videoSave)
    if (condition) {
      const abc = savedVideosList.filter(
        eachSavedCall => eachSavedCall.id !== videoSave.id,
      )
      console.log(abc)
      this.setState({savedVideosList: abc})
    } else {
      this.setState({savedVideosList: [...savedVideosList, videoSave]})
    }
  }

  render() {
    const {darkTheme, savedVideosList} = this.state
    return (
      <NextWatchContext.Provider
        value={{
          darkTheme,
          savedVideosList,
          updateTheme: this.updateTheme,
          updateSavedVideosL: this.updateSavedVideosL,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <WrappedComponent exact path="/" component={Home} />
          <WrappedComponent exact path="/trending" component={Trending} />
          <WrappedComponent exact path="/gaming" component={Gaming} />
          <WrappedComponent
            exact
            path="/saved-videos"
            component={SavedVideos}
          />
          <WrappedComponent
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />

          <Route exact path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </NextWatchContext.Provider>
    )
  }
}
export default App
