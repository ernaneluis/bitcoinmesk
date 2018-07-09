import React from 'react'
import styled from 'styled-components'

import Link from 'redux-first-router-link'
import { toNew, toRestore } from '../../../store/actions/routerActions'

const Welcome = () => (
  <div className="container bg-light">
    <div className="row justify-content-center text-center mb-5">
      <div className="col-8">
        <h1>Bitmask</h1>
      </div>
    </div>
    <div className="row justify-content-center text-center mb-5">
      <div className="col-10">
        <h4> Use Bitcoin, take control of your money</h4>
      </div>
    </div>

    <div className="row justify-content-center text-center mb-2">
      <div className="col-8">
        <Link to={toNew()} className="btn btn-success btn-lg btn-block">
          CREATE NEW WALLET
        </Link>
      </div>
    </div>

    <div className="row justify-content-center text-center ">
      <div className="col-8">
        <Link
          to={toRestore()}
          className="btn btn-outline-secondary  btn-lg btn-block"
        >
          RESTORE WALLET
        </Link>
      </div>
    </div>
  </div>
)

export default Welcome
