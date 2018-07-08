import React from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'

const Lock = ({ onSubmit, passwordHint }) => (
  <form onSubmit={onSubmit}>
    <label className="col-form-label">Password</label>
    <Field
      className="form-control"
      component="input"
      name="password"
      placeholder="password"
      type="text"
    />

    <p>Password Hint: {passwordHint}</p>

    <button type="submit" className="btn btn-success">
      UNLOCK WALLET
    </button>
  </form>
)

export default Lock
