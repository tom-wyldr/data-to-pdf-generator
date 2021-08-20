import styled from 'styled-components'

export const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-top: 40px;
  position: relative;
  height: 792px;
  &:after{
    content: "";
    display: table;
    clear: both;
  }
`

export const Item = styled.div`
  float: left;
  width: 50%;
`

export const LeftItem = styled.div`
  float: left;
  width: 40%;
  padding-right: 30px;
`

export const RightItem = styled.div`
  float: left;
  width: 60%;
`

export const IdLabel = styled.p`
  position: absolute;
  color: slategray;
  font-size: 12px;
  top: 0px;
  right: 20px;
`

export const FooterLabel = styled.p`
  position: absolute;
  color: slategray;
  font-size: 12px;
  bottom: 0px;
  left: 20px;
`
