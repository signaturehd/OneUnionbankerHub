import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray, reduxForm } from 'redux-form'
import './styles/general.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'
import DatePicker from 'react-datepicker'
import moment from 'moment'



const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
<div>
  <div>
    <Card>
      <h4> Skills </h4>
    <div className={ 'general-form-card-body' }>
      <GenericButton className={'generic-button'}
        type="button"
        onClick={() => fields.push({})}
        text= {'Add Skill'}
      >
      </GenericButton>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </div>
    {fields.map((member, index) => (

      <div className={'general-form-card'} key={index}>
        <GenericButton
          type='button'
          text="Remove Skill"
          onClick={() => fields.remove(index)}
        />
        <h4>Skill #{index + 1}</h4>
        <GenericTextBox
          name={`${member}.skillName`}
          type="text"
          component={renderField}
          placeholder={ 'Skill Name' }
        />
        <GenericTextBox
          name={`${member}.skillLvl`}
          type="text"
          component={renderField}
          placeholder={ 'Skill Level' }
        />
      </div>
    ))}
  </Card>
</div>
</div>
)
const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <Card onSubmit={handleSubmit} className={ 'general-form-card' }>
      <FieldArray name="skills" component={renderMembers} />
    </Card>
  )
}

export default reduxForm({
  form: 'skills' // a unique identifier for this form
})(FieldArraysForm)
