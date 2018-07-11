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

const Wallet = ({ transactions, onSendClick }) => (
  <div>
    <HeaderWrapper className="container">
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
    {!!transactions.length && (
      <div>
        <div className="my-3 p-3 bg-white rounded box-shadow">
          <h6 className="border-bottom border-gray pb-2 mb-0">Transactions</h6>

          {transactions.map(
            ({ date, type, address, amount, confirmations, txhash }, key) => (
              <div
                className="row small text-muted pt-3 border-bottom"
                key={key}
              >
                <div className="col-1 pt-2">
                  {type === 'SEND' ? (
                    <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
                  ) : (
                    <FontAwesomeIcon icon={faSignInAlt} size="2x" />
                  )}
                </div>
                <div className="col-8">
                  <p>
                    <strong className="text-gray-dark">
                      <a
                        href={`https://insight.bitpay.com/tx/${txhash}`}
                        target="_blank"
                      >
                        {address}
                      </a>
                    </strong>
                  </p>
                  <p>
                    <span className="d-block">{date}</span>
                  </p>
                </div>
                <div className="col-3">
                  <p>{amount} BTC</p>
                  <p>
                    <small>{confirmations} Confirmations</small>
                  </p>
                </div>
              </div>
            )
          )}

          <small className="d-block text-right mt-3">
            <a href="#">All Transactions</a>
          </small>
        </div>
      </div>
    )}

    {!!!transactions.length && <h2>No transaction</h2>}
  </div>
)

export default Wallet

{
  /* <div className="pb-3 mb-0 small border-bottom">
<div className="d-flex justify-content-between align-items-center w-100">

</div>

</div> */
}
