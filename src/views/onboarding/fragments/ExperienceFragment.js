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
      <h4> Experience </h4>
    <div className={ 'general-form-card-body' }>
      <GenericButton className={'generic-button'}
        type="button"
        onClick={() => fields.push({})}
        text= {'Add Experience'}
      >
      </GenericButton>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </div>
    {fields.map((member, index) => (

      <div className={'general-form-card'} key={index}>
        <GenericButton
          type='button'
          text="Remove Experience"
          onClick={() => fields.remove(index)}
        />
        <h4>Experience #{index + 1}</h4>
        <GenericTextBox
          name={`${member}.compName`}
          type="text"
          component={renderField}
          placeholder={ 'Company Name' }
        />
        <GenericTextBox
          name={`${member}.address`}
          type="text"
          component={renderField}
          placeholder={ 'Address' }
        />
        <GenericTextBox
          name={`${member}.position`}
          type="text"
          component={renderField}
          placeholder={ 'Position' }
        />
        <textarea
          name={`${member}.expDescription`}
          type="text"
          component={renderField}
          className={ 'experience-textarea' }
          placeholder={ 'Brief description of duties' }
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
      <FieldArray name="experience" component={renderMembers} />
    </Card>
  )
}

export default reduxForm({
  form: 'experience' // a unique identifier for this form
})(FieldArraysForm)
