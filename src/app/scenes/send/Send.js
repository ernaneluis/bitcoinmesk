import React from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'

const Send = ({ onSubmit, fromAddress }) => (
  <form onSubmit={onSubmit}>
    <label className="col-form-label">From Address:</label>
    <p> {fromAddress} </p>

    <label className="col-form-label">TO Address:</label>
    <Field
      className="form-control"
      component="input"
      name="toAddress"
      placeholder="To Bitcoin Address"
      type="text"
    />

    <Field
      className="form-control"
      component="input"
      name="amount"
      placeholder="Amount in Bitcoins"
      type="text"
    />

    <button type="submit" className="btn btn-success">
      SIGN AND SEND
    </button>
  </form>
)

export default Send
