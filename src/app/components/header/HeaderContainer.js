import { connect } from 'react-redux'
import { toWallet, toImport } from '../../../store/actions/routerActions'

import { createKey } from '../../../store/actions/walletActions'
import Header from './Header'

const mapStateToProps = state => ({
  masterPrivateKey: state.wallet.masterPrivateKey,
  nounceDeriviation: state.wallet.vault.nounceDeriviation,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  onToWallet: () => dispatch(toWallet()),
  onToImport: () => dispatch(toImport()),
})

const mergeProps = (
  { masterPrivateKey, nounceDeriviation },
  { dispatch, onToWallet, onToImport },
  ...rest
) => ({
  masterPrivateKey,
  nounceDeriviation,
  dispatch,
  onToWallet,
  onToImport,
  onToCreate: () =>
    dispatch(createKey({ masterPrivateKey, nounceDeriviation })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Header)
