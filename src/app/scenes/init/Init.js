import React from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'

const Wrapper = styled.div`
  min-height: 500px;
`

const PreeSeed = styled.p`
  word-break: break-all;
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

const Init = ({ onMouseMove, onSubmit, seed, points, mnemonic }) => (
  <Wrapper onMouseMove={onMouseMove}>
    {!mnemonic && (
      <div>
        <p>
          Secure random number generation requires that you provide some
          unpredictable data, also called "entropy". Please move your mouse
          around.
        </p>
        <PreeSeed>{seed}</PreeSeed>
        <small>{points.length}/200</small>
        <div>
          {points.map(({ x, y }, key) => <Point key={key} x={x} y={y} />)}
        </div>
      </div>
    )}

    {mnemonic && (
      <form onSubmit={onSubmit}>
        <h2>{mnemonic}</h2>
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
          className="form-control"
          component="input"
          name="passwordHint"
          placeholder="Password Hint"
          type="text"
        />
        <button type="submit" className="btn btn-success">
          Create Wallet
        </button>
      </form>
    )}
  </Wrapper>
)

export default Init
