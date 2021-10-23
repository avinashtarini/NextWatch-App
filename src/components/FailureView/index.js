import NextWatchContext from '../../context/NextWatchContext'

import {
  FailureViewContainer,
  FailureImage,
  FailurePara,
  FailureViewButtonContainer,
} from './styledComponent'

const FailureView = props => {
  const {retryFunction} = props
  const setRetryOption = () => {
    retryFunction()
  }
  return (
    <NextWatchContext.Consumer>
      {value => {
        const {darkTheme} = value
        const FailureViewImageURL = darkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <FailureViewContainer>
            <FailureImage src={FailureViewImageURL} alt="failure view" />
            <h1>Oops! Something Went Wrong</h1>
            <FailurePara>
              We are having some trouble to complete your request. Please try
              again.
            </FailurePara>
            <FailureViewButtonContainer onClick={setRetryOption} type="button">
              Retry
            </FailureViewButtonContainer>
          </FailureViewContainer>
        )
      }}
    </NextWatchContext.Consumer>
  )
}

export default FailureView
