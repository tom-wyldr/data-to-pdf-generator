import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 365px;
  height: 125px;
`

export const Image = styled.img`
  height: 125px;
  width: 365px;
  object-fit: cover;
  border-radius: 20px;
`

export const Icon = styled.img`
  height: 15px;
  width: 15px;
`

export const Info = styled.div`
  background: rgba(255,255,255,0.8);
  padding: 10px;
  display: flex;
  position: absolute;
  bottom: 0px;
  right: 0px;
  span {
    margin-right: 10px;
    margin-left: 1px;
    font-size: 12px;
  }
`
