import React from 'react'
import styled from 'styled-components'

import Wallet from '../../scenes/wallet/WalletContainer'
import Init from '../../scenes/init/InitContainer'
import Create from '../../scenes/create/CreateContainer'
import Import from '../../scenes/import/ImportContainer'
import Lock from '../../scenes/lock/LockContainer'

const Container = styled.main.attrs({
  className: 'container',
})`
  min-height: 500px;
  &&& {
    padding: 80px 15px 0;
  }
  @media (max-width: ${props => props.theme.screenSize.md}) {
    &&& {
      padding: 200px 15px 0;
    }
  }
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
    {scene === 'INIT' && <Init />}
    {scene === 'LOCK' && <Lock />}
    {scene === 'CREATE' && <Create />}
    {scene === 'IMPORT' && <Import />}
  </Container>
)

export default Body
