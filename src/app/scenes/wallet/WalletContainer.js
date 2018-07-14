import { connect } from 'react-redux'
import Wallet from './Wallet'
import { fetchAllKeys } from '../../../store/actions/walletActions'
import {
  getLastAddress,
  simplifyTransactions,
  getBalance,
} from '../../../store/selectors'

import * as bitcoin from '../../lib/bitcoin'

const mapStateToProps = state => {
  const address = getLastAddress(state)
  const transactions = simplifyTransactions(
    address,
    state.wallet.vault.transactions[address]
  )
  const balance = getBalance(transactions)
  return {
    address,
    balance,
    transactions,
    keys: state.wallet.vault.keys,
    masterPrivateKey: state.wallet.masterPrivateKey,
    nounceDeriviation: state.wallet.vault.nounceDeriviation,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (
  { address, balance, keys, masterPrivateKey, nounceDeriviation, transactions },
  { dispatch },
  { handleSubmit }
) => ({
  address,
  balance,
  keys,
  masterPrivateKey,
  nounceDeriviation,
  transactions,
  dispatch,
  // refreshBalance: () =>
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Wallet)
