import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Init from './Init'
import {
  initSeed,
  createSeedFromEvent,
} from '../../../store/actions/initActions'
import { isEmpty } from 'lodash'

import Seeder from '../../lib/bitcoin/bitcoin.seeder'
import utils from '../../lib/bitcoin/bitcoin.utils'

const mapStateToProps = state => ({
  tempSeed: state.init.tempSeed,
  points: state.init.points,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  init: dispatch(initSeed()),
})

const mergeProps = ({ tempSeed, points }, { dispatch }, ...rest) => ({
  tempSeed,
  points,
  dispatch,
  onMouseMove: e => {
    // if (!mnemonic) {
    // entropy > seed > mnemonic > hdkey + password
    dispatch(createSeedFromEvent(e))

    // }
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Init)
