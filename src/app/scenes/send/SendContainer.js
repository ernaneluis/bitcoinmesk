import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Send from './Send'

import { unlockWallet } from '../../../store/actions/walletActions'

const mapStateToProps = state => ({
  fromAddress: state.location.payload.fromAddress,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = ({ fromAddress }, { dispatch }, { handleSubmit }) => ({
  fromAddress,
  dispatch,
  onSubmit: handleSubmit(({ toAddress, amount }) => {
    console.log('submit')
    // dispatch(unlockWallet({ toAddress, amount }))
  }),
})

export default reduxForm({
  form: 'sendForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(Send)
)
