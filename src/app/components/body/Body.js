import React from 'react'
import styled from 'styled-components'

import Wallet from '../../scenes/wallet/WalletContainer'
import New from '../../scenes/new/NewContainer'
import Receive from '../../scenes/receive/ReceiveContainer'
import Restore from '../../scenes/restore/RestoreContainer'
import Lock from '../../scenes/lock/LockContainer'
import Send from '../../scenes/send/SendContainer'
import Welcome from '../../scenes/welcome/WelcomeContainer'

const Container = styled.main.attrs({
  className: 'container',
})`
  min-height: 500px;
`

const Body = ({ scene }) => (
  <Container>
    {scene === 'NEW' && <New />}
    {scene === 'LOCK' && <Lock />}
    {scene === 'RESTORE' && <Restore />}
    {scene === 'WALLET' && <Wallet />}
    {scene === 'RECEIVE' && <Receive />}
    {scene === 'SEND' && <Send />}
    {scene === 'WELCOME' && <Welcome />}
  </Container>
)

export default Body
