import styled from 'styled-components'

export const VideosItemsDetailsContainer = styled.div`
  width: 100%;
  height: 90vh;
  overflow: auto;
  padding-right: 24px;
  padding-top: 16px;
  padding-left: 13px;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
`
export const ButtonContainer = styled.button`
  border-width: 0px;
  margin-right: 10px;
  cursor: pointer;
  color: ${props => props.buttonColor};
`
