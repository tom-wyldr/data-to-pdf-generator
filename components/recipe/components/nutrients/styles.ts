import styled from 'styled-components'

export const Container = styled.div`
  height: 150px;
  column-count: 2;
  display: block;
  margin: 10px 0px 10px 0px;
`

export const Item = styled.div`
  display: flex;
  font-size: 12px;
  width: 120px;
  height: 30px;
  vertical-align: top;
  
  &:after{
    clear: both;
  }
`

export const Name = styled.p`
  float: left;
  width: 50%;
`

export const Value = styled.p`
  float: left;
  width: 50%;
  font-weight: bold;
  text-align: right;
`
