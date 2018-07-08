import { connect } from 'react-redux'
import Wallet from './Wallet'
import { fetchAllKeys } from '../../../store/actions/walletActions'

const mapStateToProps = state => ({
  keys: state.wallet.keys,
  masterPrivateKey: state.wallet.masterPrivateKey,
  nounceDeriviation: state.wallet.vault.nounceDeriviation,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (
  { keys, masterPrivateKey, nounceDeriviation },
  { dispatch },
  { handleSubmit }
) => ({
  keys,
  masterPrivateKey,
  nounceDeriviation,
  dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Wallet)
