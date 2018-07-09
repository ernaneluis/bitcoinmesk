import React from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'

const Wrapper = styled.div`
  min-height: 500px;
`

const PreeSeed = styled.div.attrs({
  className: 'text-muted',
})`
  word-break: break-all;
  font-size: 0.7em;
`

const Point = styled.div.attrs({
  style: ({ x, y }) => ({ x, y }),
})`
  left: ${props => props.x + 'px'};
  top: ${props => props.y + 'px'};
  background-color: black;
  border-radius: 50%;
  width: 5px;
  height: 5px;
  position: absolute;
  z-index: 999;
`

const New = ({ onMouseMove, onSubmit, seed, points, mnemonic }) => (
  <Wrapper onMouseMove={onMouseMove}>
    <div className="row bg-dark text-white">
      <div className="col-4">
        <h3>Bitmask</h3>
      </div>
      <div className="col-8">
        <small>Creating your new Wallet</small>
      </div>
    </div>
    {!mnemonic && (
      <div className="container">
        <div className="row">
          <p>
            Secure random number generation requires that you provide some
            unpredictable data, also called "entropy".
          </p>
          <p>Please move your mouse around.</p>
          <div className="jumbotron">
            <PreeSeed>{seed}</PreeSeed>
          </div>
        </div>
        <div className="row text-center">
          <small className="w-100">{points.length}/200</small>
        </div>
        <div>
          {points.map(({ x, y }, key) => <Point key={key} x={x} y={y} />)}
        </div>
      </div>
    )}
    {mnemonic && (
      <form onSubmit={onSubmit}>
        <p>This is your mnemonic recovery words:</p>
        <div className="jumbotron">{mnemonic}</div>
        <p>
          <small>You must save this in order to backup your funds.</small>
        </p>
        <hr />
        <label className="col-form-label">Password</label>
        <Field
          className="form-control"
          component="input"
          name="password"
          placeholder="Password"
          type="password"
        />
        <label className="col-form-label">Password Confirm</label>
        <Field
          className="form-control"
          component="input"
          name="passwordConfirm"
          placeholder="Password"
          type="password"
        />
        <label className="col-form-label">Password Hint</label>
        <Field
          className="form-control mb-2"
          component="input"
          name="passwordHint"
          placeholder="Password Hint"
          type="text"
        />
        <button type="submit" className="btn btn-success btn-lg btn-block">
          Create Wallet
        </button>
      </form>
    )}
  </Wrapper>
)

export default New
