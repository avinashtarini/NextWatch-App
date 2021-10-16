import React from 'react'

const NextWatchContext = React.createContext({
  darkTheme: false,
  savedVideosList: [],
  updateTheme: () => {},
  updateSavedVideosL: () => {},
})

export default NextWatchContext
