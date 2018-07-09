import { connect } from 'react-redux'
import Welcome from './Welcome'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export default connect(mapStateToProps)(Welcome)
