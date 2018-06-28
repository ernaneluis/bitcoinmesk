import { connect } from 'react-redux'

import App from './App'

const mapStateToProps = state => ({
  scene: state.location.type,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
