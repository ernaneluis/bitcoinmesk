import { connect } from 'react-redux'
import Wallet from './Wallet'
import { fetchAllKeys } from '../../../store/actions/walletActions'

import * as bitcoin from '../../lib/bitcoin'

const mapStateToProps = state => ({
  keys: state.wallet.vault.keys,
  masterPrivateKey: state.wallet.masterPrivateKey,
  nounceDeriviation: state.wallet.vault.nounceDeriviation,
  transactions: [
    {
      date: Date(Date.now())
        .toLocaleString()
        .split('GMT')[0],
      type: 'SEND',
      amount: bitcoin.utils.satoshiToBitcoin(16231102),
      address: '1Exi95PsBdV5PxrJGi7ZZ8Hk9uoLpgMVeV',
      confirmations: 1,
      txhash:
        '3c4e8fb8c41cf029e89e302c45d6e6e3eeb89d34b6c985826303760a3308e75f',
    },
    {
      date: Date(Date.now())
        .toLocaleString()
        .split('GMT')[0],
      type: 'RECEIVE',
      amount: bitcoin.utils.satoshiToBitcoin(16231102),
      address: '1Exi95PsBdV5PxrJGi7ZZ8Hk9uoLpgMVeV',
      confirmations: 1,
      txhash:
        '3c4e8fb8c41cf029e89e302c45d6e6e3eeb89d34b6c985826303760a3308e75f',
    },
  ],
})

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (
  { keys, masterPrivateKey, nounceDeriviation, transactions },
  { dispatch },
  { handleSubmit }
) => ({
  keys,
  masterPrivateKey,
  nounceDeriviation,
  transactions,
  dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Wallet)
