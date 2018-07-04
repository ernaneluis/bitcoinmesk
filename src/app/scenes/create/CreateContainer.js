import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Create from './Create'
import { createAddress } from '../../../store/actions/createActions'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (stateProps, { dispatch }, { handleSubmit }) => ({
  ...stateProps,
  dispatch,
  onSubmit: handleSubmit(values => dispatch(createAddress(values))),
})

export default reduxForm({
  form: 'createForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(Create)
)
