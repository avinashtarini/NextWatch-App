import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
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
    savedVideosList: [],
  }

  updateTheme = () => {
    this.setState(prevState => ({darkTheme: !prevState.darkTheme}))
  }

  updateSavedVideos = videoSave => {
    const {savedVideosList} = this.state
    this.setState({savedVideosList: [...savedVideosList, videoSave]})
  }

  render() {
    const {darkTheme, savedVideosList} = this.state
    return (
      <Switch>
        <NextWatchContext.Provider
          value={{
            darkTheme,
            savedVideosList,
            updateTheme: this.updateTheme,
            updateSavedVideos: this.updateSavedVideos,
          }}
        >
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
        </NextWatchContext.Provider>
      </Switch>
    )
  }
}
export default App
