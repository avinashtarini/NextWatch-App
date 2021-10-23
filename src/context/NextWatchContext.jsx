import React from 'react'

const NextWatchContext = React.createContext({
  darkTheme: false,
  isSavedTextState: 'Save',
  savedVideosList: [],
  updateTheme: () => {},
  updateSavedVideosL: () => {},
})

export default NextWatchContext
