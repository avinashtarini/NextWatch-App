import styled from 'styled-components'

export const BackgroundBanner = styled.div`
  width: 100%;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  font-family: 'Roboto';
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const NextWatchLogo = styled.img`
  height: 40px;
  margin-bottom: 10px;
`
export const BannerPara = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
  color: #313131;
`

export const BannerButton = styled.button`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  background-color: transparent;
  padding-bottom: 5px;
  border: 1px solid #313131;
  color: #313131;
  width: 30%;
`
export const CloseButton = styled.button`
  align-self: flex-start;
  background-color: transparent;
  border-width: 0px;
`
