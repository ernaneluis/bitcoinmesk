import { connect } from 'react-redux'
import * as bitcoin from '../../lib/bitcoin'
import Backup from './Backup'

const mapStateToProps = state => ({
  mnemonic: state.wallet.mnemonic,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Backup)
