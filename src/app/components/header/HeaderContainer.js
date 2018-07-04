import { connect } from 'react-redux'
import {
  toWallet,
  toCreate,
  toImport,
} from '../../../store/actions/routerActions'
import Header from './Header'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  onToWallet: () => dispatch(toWallet()),
  onToCreate: () => dispatch(toCreate()),
  onToImport: () => dispatch(toImport()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
