import styled from 'styled-components'

export const GamingVideosContainer = styled.div`
  width: 100%;
  height: 90vh;
  overflow: auto;
  padding-right: 24px;
  padding-top: 16px;
  padding-left: 13px;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
`
export const MainHeadingGaming = styled.div`
  font-size: 25px;
  margin-left: 10px;
`

export const FailureViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px;
`

export const FailureImage = styled.img`
  width: 400px;
`

export const FailureHeading = styled.h1`
  font-size: 30px;
`

export const FailurePara = styled.p`
  font-size: 20px;
`

export const FailureVireButtonConatiner = styled.button`
  font-size: 18px;
  padding: 12px;
`
