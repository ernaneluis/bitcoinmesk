import React from 'react'
import styled from 'styled-components'
import { IntlProvider } from 'react-intl'
import { ThemeProvider, injectGlobal } from 'styled-components'
import * as theme from './theme.js'

import Body from './components/body/BodyContainer'
import Footer from './components/footer/FooterContainer'

import './bootstrap.css'

injectGlobal`
html {
  position: relative;
  min-height: 100%;
}
body {
  /* Margin bottom by footer height */
  margin-bottom: 60px;
}
`

const App = () => (
  <IntlProvider locale="en">
    <ThemeProvider theme={theme}>
      <div>
        <Body />
        <Footer />
      </div>
    </ThemeProvider>
  </IntlProvider>
)

export default App
