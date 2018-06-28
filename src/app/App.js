import React from 'react'
import styled from 'styled-components'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from 'styled-components'
import * as theme from './theme.js'

const Container = styled.div.attrs({
  className: 'container',
})`
  @media (max-width: ${props => props.theme.screenSize.lg}) {
    &.container {
      width: 100%;
      padding: 0px;
    }
  }
`

const App = ({ scene }) => (
  <IntlProvider locale="en">
    <ThemeProvider theme={theme}>
      <Container>{scene}</Container>
    </ThemeProvider>
  </IntlProvider>
)

export default App
