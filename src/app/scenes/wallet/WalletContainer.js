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
  const transactions = simplifyTransactions(state)
  const balance = getBalance(state)
  return {
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
  { balance, keys, masterPrivateKey, nounceDeriviation, transactions },
  { dispatch },
  { handleSubmit }
) => ({
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
