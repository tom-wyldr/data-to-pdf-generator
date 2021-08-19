import styled from 'styled-components'

export const Container = styled.div`
  max-height: 200px;
  column-count: 2;
  display: block;
  margin: 10px 0px 10px 0px;
`

export const Item = styled.div`
  display: flex;
  font-size: 12px;
  margin-bottom: 5px;
  vertical-align: top;
  
  &:after{
    clear: both;
  }
`

export const Name = styled.p`
  float: left;
  width: 65%;
`

export const Value = styled.p`
  float: left;
  width: 35%;
  font-weight: bold;
  text-align: right;
`
