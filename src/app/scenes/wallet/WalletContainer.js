import { connect } from 'react-redux'

import Wallet from './Wallet'

const mapStateToProps = state => ({
  mnemonic: state.wallet.mnemonic,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = ({ mnemonic }, { dispatch }, ...rest) => ({
  mnemonic,
  dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Wallet)
