import React from 'react'
import styled from 'styled-components'

import Wallet from '../../scenes/wallet/WalletContainer'
import Create from '../../scenes/create/CreateContainer'
import Import from '../../scenes/import/ImportContainer'

const Container = styled.main.attrs({
  className: 'container',
})`
  padding: 60px 15px 0;
  @media (max-width: ${props => props.theme.screenSize.lg}) {
    &.container {
      width: 100%;
      padding: 0px;
    }
  }
`

const Body = ({ scene }) => (
  <Container>
    {scene === 'WALLET' && <Wallet />}
    {scene === 'CREATE' && <Create />}
    {scene === 'IMPORT' && <Import />}
  </Container>
)

export default Body
