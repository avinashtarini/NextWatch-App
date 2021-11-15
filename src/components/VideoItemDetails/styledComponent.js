import styled from 'styled-components'

export const VideosItemsDetailsContainer = styled.div`
  width: 100%;
  overflow: auto;
  padding-right: 24px;
  padding-top: 16px;
  padding-left: 13px;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  @media screen and (max-width: 568px) {
    padding-right: 15px;
    padding-top: 10px;
    padding-left: 9px;
  }
`
export const ButtonContainer = styled.button`
  border-width: 0px;
  margin-right: 10px;
  cursor: pointer;
  color: ${props => props.buttonColor};
`
