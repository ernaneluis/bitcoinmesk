import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Lock from './Lock'

import { unlockWallet } from '../../../store/actions/walletActions'

const mapStateToProps = state => ({
  encryptedMnemonic: state.wallet.vault.encryptedMnemonic,
  passwordHint: state.wallet.vault.passwordHint,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (
  { encryptedMnemonic, passwordHint },
  { dispatch },
  { handleSubmit }
) => ({
  encryptedMnemonic,
  passwordHint,
  dispatch,
  onSubmit: handleSubmit(({ password }) =>
    dispatch(unlockWallet({ encryptedMnemonic, password }))
  ),
})

export default reduxForm({
  form: 'lockForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(Lock)
)
