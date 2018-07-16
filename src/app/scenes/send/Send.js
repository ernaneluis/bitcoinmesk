import React from 'react'
import styled from 'styled-components'
import Link from 'redux-first-router-link'
import { Field } from 'redux-form'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

import { toWallet } from '../../../store/actions/routerActions'

const HeaderWrapper = styled.header.attrs({
  className: 'container bg-light mb-5',
})`
  height: 23vh;
`

const Send = ({ onSubmit, balance }) => (
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
      </div>
    </HeaderWrapper>

    <div className="row justify-content-center mb-2">
      <div className="col-8">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <Field
              className="form-control form-control-lg"
              component="input"
              name="toAddress"
              placeholder="To Bitcoin Address"
              type="text"
            />
          </div>

          <div className="form-group">
            <Field
              className="form-control form-control-lg"
              component="input"
              name="amount"
              placeholder="Amount in Bitcoins"
              type="text"
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-success btn-larg btn-block mb-2"
            >
              SIGN AND SEND
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)

export default Send
