import React from 'react'
import styled from 'styled-components'

const Wallet = ({ keys }) => (
  <div>
    {!!keys.length && (
      <div>
        {keys.map(({ privateKey, publicKey, address }, key) => (
          <p key={key}> {address} </p>
        ))}
      </div>
    )}

    {!!!keys.length && <h2>no address create one now</h2>}
  </div>
)

export default Wallet
