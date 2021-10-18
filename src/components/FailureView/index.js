const FailureView = props => {
  const {retryFunction} = props
  const setRetryOption = () => {
    retryFunction()
  }
  return (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-msg">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button onClick={setRetryOption} type="button" className="retry-button">
        Retry
      </button>
    </div>
  )
}

export default FailureView
