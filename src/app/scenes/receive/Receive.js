import React from 'react'
import styled from 'styled-components'
import QRCode from 'qrcode-react'
import Link from 'redux-first-router-link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

import { toWallet } from '../../../store/actions/routerActions'

const HeaderWrapper = styled.header.attrs({
  className: 'container bg-light mb-5',
})`
  height: 23vh;
`

const Receive = ({ address, balance, onCreateNewAddress }) => (
  <div className="text-center">
    <HeaderWrapper>
      <div className="row pt-2 justify-content-between">
        <div className="col-6 text-left">
          <Link to={toWallet()} className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faLongArrowAltLeft} />
          </Link>
        </div>
      </div>
      <div className="row justify-content-center align-items-center h-50">
        <div className="col-8 mx-auto text-center">
          <h3>
            {balance} <FontAwesomeIcon icon={faBitcoin} />
          </h3>
        </div>
        <div className="col-8 justify-content-center">
          <small>{address} </small>
        </div>
      </div>
    </HeaderWrapper>

    <div className="row justify-content-center mb-5">
      <div className="col-8">
        <QRCode value={address} size={200} />
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-8">
        <button
          onClick={onCreateNewAddress}
          className="btn btn-outline-success"
        >
          Create new address
        </button>
      </div>
    </div>
  </div>
)

export default Receive
