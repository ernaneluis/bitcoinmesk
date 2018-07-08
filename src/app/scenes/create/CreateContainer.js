import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Create from './Create'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (stateProps, { dispatch }, { handleSubmit }) => ({
  ...stateProps,
  dispatch,
  onSubmit: handleSubmit(values => dispatch()),
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
