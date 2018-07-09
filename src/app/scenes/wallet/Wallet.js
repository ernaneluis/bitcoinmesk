import React from 'react'
import styled from 'styled-components'

import Link from 'redux-first-router-link'
import {
  toSend,
  toWallet,
  toReceive,
} from '../../../store/actions/routerActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faCog,
  faSignInAlt,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

import { faBitcoin } from '@fortawesome/free-brands-svg-icons'

const HeaderWrapper = styled.header`
  height: 23vh;
`

const Wallet = ({ keys, onSendClick }) => (
  <div>
    <HeaderWrapper className="container bg-light">
      <div className="row pt-2 justify-content-between">
        <div className="col-6 text-left">
          <Link to={toWallet()} className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faBars} />
          </Link>
        </div>

        <div className="col-6 text-right">
          <Link to={toWallet()} className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faCog} />
          </Link>
        </div>
      </div>
      <div className="row align-items-center h-50">
        <div className="col-12 mx-auto text-center">
          <h3>
            120.00 <FontAwesomeIcon icon={faBitcoin} />
          </h3>
        </div>
      </div>

      <div className="row h-25 justify-content-between">
        <div className="col-6 text-left">
          <Link to={toReceive()} className="btn btn-outline-warning btn-lg">
            <FontAwesomeIcon icon={faSignInAlt} />RECEIVE
          </Link>
        </div>
        <div className="col-6 text-right">
          <Link to={toSend()} className="btn btn-outline-success btn-lg">
            SEND <FontAwesomeIcon icon={faSignOutAlt} />
          </Link>
        </div>
      </div>
    </HeaderWrapper>
    {!!keys.length && (
      <div>
        <h1> balance sum of utxos </h1>
        <p>Transactions </p>
        {keys.map(({ privateKey, publicKey, address }, key) => (
          <div key={key}>
            <p> {address} </p>
          </div>
        ))}
      </div>
    )}

    {!!!keys.length && <h2>no address create one now</h2>}
  </div>
)

export default Wallet
