import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Lock from './Lock'
import { toPrevious } from '../../../store/actions/routerActions'
import { unlockWallet } from '../../../store/actions/walletActions'

const mapStateToProps = state => ({
  state,
  encryptedMnemonic: state.wallet.vault.encryptedMnemonic,
  passwordHint: state.wallet.vault.passwordHint,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (
  { state, encryptedMnemonic, passwordHint },
  { dispatch },
  { handleSubmit }
) => ({
  state,
  encryptedMnemonic,
  passwordHint,
  dispatch,
  onSubmit: handleSubmit(({ password }) => {
    dispatch(unlockWallet({ encryptedMnemonic, password }))
    dispatch(toPrevious(state))
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
