import React from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'

const renderField = field => (
  <div className="input-row">
    <input {...field.input} type="text" />
    {field.meta.touched &&
      field.meta.error && <span className="error">{field.meta.error}</span>}
  </div>
)

const Create = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label className="col-form-label">Nickname</label>
    <Field
      className="form-control"
      component={renderField}
      name="label"
      placeholder="Nickname"
      type="text"
    />
    <label className="col-form-label">Passphrase</label>
    <Field
      className="form-control"
      component={renderField}
      name="passphrase"
      placeholder="Passphrase"
      type="text"
    />
    <label className="col-form-label">Passphrase Confirm</label>
    <Field
      className="form-control"
      component={renderField}
      name="passphraseConfirm"
      placeholder="Passphrase"
      type="text"
    />
    <label className="col-form-label">Passphrase Hint</label>
    <Field
      className="form-control"
      component={renderField}
      name="passphraseHint"
      placeholder="Passphrase Hint"
      type="text"
    />
    <button type="submit" className="btn btn-success">
      Create
    </button>
  </form>
)

export default Create
