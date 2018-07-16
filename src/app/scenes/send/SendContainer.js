import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { redirect } from 'redux-first-router'
import { isEmpty, uniq } from 'lodash'

import Send from './Send'

import * as bitcoin from '../../lib/bitcoin'
import {
  getAllUtxos,
  getBalance,
  getPrivateKeyFromAddresses,
} from '../../../store/selectors'
import { sendTransaction } from '../../../store/actions/sendActions'
import { toLock } from '../../../store/actions/routerActions'

const mapStateToProps = state => {
  const addresses = uniq(getAllUtxos(state).map(utxo => utxo.address))
  return {
    balance: getBalance(state),
    utxos: getAllUtxos(state),
    privateKeys: getPrivateKeyFromAddresses({ state, addresses }),
  }
}
const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (
  { balance, utxos, privateKeys },
  { dispatch },
  { handleSubmit }
) => ({
  balance,
  utxos,
  privateKeys,
  dispatch,
  onSubmit: handleSubmit(({ toAddress, amount }) => {
    isEmpty(privateKeys)
      ? dispatch(redirect(toLock()))
      : dispatch(
          sendTransaction({
            privateKeys,
            toAddress,
            amount,
            utxos,
          })
        )
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
