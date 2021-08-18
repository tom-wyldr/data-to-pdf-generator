import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

export const Container = styled.div`
  display: flex;
  margin: 5px;
`

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
  }
`
