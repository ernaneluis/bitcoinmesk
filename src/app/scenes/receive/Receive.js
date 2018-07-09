import React from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'

const Receive = ({ onSubmit }) => (
  <div>
    <p> qr code </p>
    <p> address to receive </p>
    <button> create new address to receive </button>
  </div>
)

export default Receive
