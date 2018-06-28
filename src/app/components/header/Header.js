import React from 'react'
import styled from 'styled-components'

const Header = ({ onToWallet, onToCreate, onToImport }) => (
  <header>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <span className="navbar-brand">Bitmask</span>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active mr-2 mb-2">
            <button className="btn btn-outline-light" onClick={onToWallet}>
              My Wallet
            </button>
          </li>
          <li className="nav-item mr-2 mb-2">
            <button className="btn btn-outline-success" onClick={onToCreate}>
              Create Address
            </button>
          </li>

          <li className="nav-item">
            <button className="btn btn-outline-warning" onClick={onToImport}>
              Import Address
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
)

export default Header
