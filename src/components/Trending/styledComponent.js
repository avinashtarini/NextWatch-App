import styled from 'styled-components'

export const TrendingVideosContainer = styled.div`
  width: 100%;
  height: 90vh;
  overflow: auto;
  padding-right: 24px;
  padding-top: 16px;
  padding-left: 13px;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
`
export const MainHeadingTrending = styled.div`
  font-size: 38px;
`
