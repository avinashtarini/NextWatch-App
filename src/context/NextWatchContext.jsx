import React from 'react'

const NextWatchContext = React.createContext({
  darkTheme: false,
  savedVideosList: [],
  updateTheme: () => {},
  updateSavedVideos: () => {},
})

export default NextWatchContext
