import React from 'react'
import styled from 'styled-components'

import Link from 'redux-first-router-link'
import {
  toSend,
  toWallet,
  toReceive,
  toBackup,
} from '../../../store/actions/routerActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faCog,
  faSignInAlt,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

import { faBitcoin } from '@fortawesome/free-brands-svg-icons'

import * as bitcoin from '../../lib/bitcoin'

const HeaderWrapper = styled.header`
  height: 23vh;
`

const Wallet = ({ balance, transactions, onSendClick }) => (
  <div>
    <HeaderWrapper className="container">
      <div className="row pt-2 justify-content-between">
        <div className="col-6 text-left">
          <Link to={toWallet()} className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faBars} />
          </Link>
        </div>

        <div className="col-6 text-right">
          <Link to={toBackup()} className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faCog} />
          </Link>
        </div>
      </div>
      <div className="row align-items-center h-50">
        <div className="col-12 mx-auto text-center">
          <h3>
            {bitcoin.utils.satoshiToBitcoin(balance)}{' '}
            <FontAwesomeIcon icon={faBitcoin} />
          </h3>
        </div>
      </div>

      <div className="row h-25 justify-content-between">
        <div className="col-6 text-left">
          <Link to={toReceive()} className="btn btn-outline-success btn-lg">
            <FontAwesomeIcon icon={faSignInAlt} />RECEIVE
          </Link>
        </div>
        <div className="col-6 text-right">
          <Link to={toSend()} className="btn btn-outline-danger btn-lg">
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
            ({ time, type, value, confirmations, txid }, key) => (
              <div
                className="row small text-muted pt-3 border-bottom"
                key={key}
              >
                <div className="col-1 pt-2">
                  {type === 'SEND' ? (
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      size="2x"
                      className="text-danger"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faSignInAlt}
                      size="2x"
                      className="text-success"
                    />
                  )}
                </div>
                <div className="col-7">
                  <p>
                    <strong className="text-gray-dark">
                      <a
                        href={
                          process.env.REACT_APP_ENV === 'development'
                            ? `https://test-insight.bitpay.com/tx/${txid}`
                            : `https://insight.bitpay.com/tx/${txid}`
                        }
                        target="_blank"
                      >
                        {txid.substr(0, 50)}...
                      </a>
                    </strong>
                  </p>

                  <p>
                    <span className="d-block">
                      {
                        Date(time)
                          .toLocaleString()
                          .split('GMT')[0]
                      }
                    </span>
                  </p>
                </div>
                <div className="col-4 text-right">
                  {type === 'SEND' ? (
                    <p className="text-danger">
                      -{bitcoin.utils.satoshiToBitcoin(value)} BTC
                    </p>
                  ) : (
                    <p className="text-success">
                      +{bitcoin.utils.satoshiToBitcoin(value)} BTC
                    </p>
                  )}

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
