import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Receive from './Receive'
import { isEmpty, last } from 'lodash'
import { createKey } from '../../../store/actions/walletActions'

import { getLastAddress, getBalance } from '../../../store/selectors'

const mapStateToProps = state => ({
  address: getLastAddress(state),
  masterPrivateKey: state.wallet.vault.masterPrivateKey,
  nounceDeriviation: state.wallet.vault.nounceDeriviation,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (
  { address, balance, masterPrivateKey, nounceDeriviation },
  { dispatch },
  ...ownProps
) => ({
  address,
  balance,
  dispatch,
  onCreateNewAddress: () =>
    dispatch(createKey({ masterPrivateKey, nounceDeriviation })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Receive)
