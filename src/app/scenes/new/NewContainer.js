import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import New from './New'
import {
  initSeed,
  createSeedFromEvent,
  newWallet,
} from '../../../store/actions/newActions'

const mapStateToProps = state => ({
  seed: state.init.seed,
  mnemonic: state.init.mnemonic,
  isSeedingDone: state.init.isSeedingDone,
  points: state.init.points,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  init: dispatch(initSeed()),
})

const mergeProps = (
  { isSeedingDone, seed, points, mnemonic },
  { dispatch },
  { handleSubmit, ...ownProps }
) => ({
  ...ownProps,
  isSeedingDone,
  seed,
  points,
  mnemonic,
  dispatch,
  onMouseMove: e => {
    if (!isSeedingDone) dispatch(createSeedFromEvent(e))
  },
  onSubmit: handleSubmit(({ password, passwordHint }) =>
    dispatch(newWallet({ mnemonic, password, passwordHint }))
  ),
})

export default reduxForm({
  form: 'newForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(New)
)
