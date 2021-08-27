import styled from 'styled-components'

export const Container = styled.div`
  border-radius: 10px;
  background-color: #01af9b;
  min-height: 85px;
  position: relative;
  margin: 10px 0px 10px 0px;
`

export const Card = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`

export const Ava = styled.div`
  align-self: center;
  padding-left: 5px;
`

export const Sign = styled.div`
  background: rgb(242,242,242);
  padding: 3px 25px 3px 25px;
  font-size: 12px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  transform: translateY(50%);
`

export const Label = styled.p`
  color: white;
  font-size: 12px;
  margin-left: 5px;
  padding-right: 5px;
  padding-bottom: 13px;
  padding-top: 13px;
`

export const Icon = styled.img`
  height: 25px;
  width: 25px;
  position: absolute;
  top: 0%;
  right: 0%;
  transform: translateX(40%) translateY(-60%);
`
