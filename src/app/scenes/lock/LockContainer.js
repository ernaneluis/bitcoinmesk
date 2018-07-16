import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Lock from './Lock'
import { toPrevious } from '../../../store/actions/routerActions'
import { unlockWallet } from '../../../store/actions/walletActions'
import * as bitcoin from '../../lib/bitcoin'

const mapStateToProps = state => ({
  state,
  encryptedMnemonic: state.wallet.vault.encryptedMnemonic,
  encryptedPassword: state.wallet.vault.encryptedPassword,
  passwordHint: state.wallet.vault.passwordHint,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (
  { state, encryptedMnemonic, encryptedPassword, passwordHint },
  { dispatch },
  { handleSubmit }
) => ({
  state,
  encryptedMnemonic,
  encryptedPassword,
  passwordHint,
  dispatch,
  onSubmit: handleSubmit(async ({ password }) => {
    if (encryptedPassword === bitcoin.utils.hash(password)) {
      await dispatch(unlockWallet({ encryptedMnemonic, password }))
      await dispatch(toPrevious(state))
    } else alert('Wrong Password')
  }),
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
