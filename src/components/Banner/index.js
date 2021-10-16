import {Component} from 'react'
import {GrClose} from 'react-icons/gr'
import {
  BackgroundBanner,
  DetailsContainer,
  NextWatchLogo,
  BannerPara,
  CloseButton,
  BannerButton,
} from './styledComponent'

class Banner extends Component {
  state = {displayBanner: true}

  closeBanner = () => {
    this.setState(prevBanner => ({
      displayBanner: !prevBanner.displayBanner,
    }))
  }

  renderBanner = () => (
    <BackgroundBanner>
      <DetailsContainer>
        <NextWatchLogo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <BannerPara>Buy Nxt Watch Premium prepaid plans with UPI</BannerPara>
        <BannerButton type="button">GET IT NOW</BannerButton>
      </DetailsContainer>
      <CloseButton data-testid="close" onClick={this.closeBanner}>
        <GrClose />
      </CloseButton>
    </BackgroundBanner>
  )

  render() {
    const {displayBanner} = this.state

    return (
      <div data-testid="banner">{displayBanner && this.renderBanner()}</div>
    )
  }
}

export default Banner
