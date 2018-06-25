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

const renderDatePicker = ({ input, label, type, className, selected, meta: { touched, error } }) =>
  <DatePicker
    format="DD MMM YYYY"
    time={showTime}
    {...input}
        selected={selected}
        placeholder={'Start Date'}
        type={type}
        className={'calendar'}
        dropdownMode="select"
  />


const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
<div>
  <div>
    <Card>
      <h4> Education </h4>
    <div className={ 'general-form-card-body' }>
      <GenericButton className={'generic-button'}
        type="button"
        onClick={() => fields.push({})}
        text= {'Add Education'}
      >
      </GenericButton>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </div>
    {fields.map((member, index) => (

      <div className={'general-form-card'} key={index}>
        <GenericButton
          type='button'
          text="Remove Education"
          onClick={() => fields.remove(index)}
        />
        <h4>Education #{index + 1}</h4>
        <GenericTextBox
          name={`${member}.school`}
          type="text"
          component={renderField}
          placeholder={ 'School' }
        />
        <GenericTextBox
          name={`${member}.degree`}
          type="text"
          component={renderField}
          placeholder={ 'Degree' }
        />
        <GenericTextBox
          name={`${member}.course`}
          type="text"
          component={renderField}
          placeholder={ 'Course' }
        />
        <GenericTextBox
          name={`${member}.specialH`}
          type="text"
          component={renderField}
          placeholder={ 'Special Honors' }
        />
        <div> <h4> Inclusive Dates </h4>
        <label>Start Date</label>
        <Field
          placeholder = {'Start Date'}
          name={`${member}.startDate`}
          readOnly
          component={renderDatePicker}
          className = { 'calendar' }
          calendarClassName = { 'calendarClass' }

        />
      </div>
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
      <FieldArray name="Education" component={renderMembers} />
    </Card>
  )
}

export default reduxForm({
  form: 'education' // a unique identifier for this form
})(FieldArraysForm)
