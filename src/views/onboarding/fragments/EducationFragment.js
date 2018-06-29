import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray, reduxForm } from 'redux-form'
import './styles/general.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'
import DatePicker from 'react-datepicker'
import moment from 'moment'

const required = value => value ? undefined : 'Required'
const minLength = min => value =>
  value && value.length > min ? `Must be ${max} characters or more` : undefined
const maxLength15 = minLength(0)
const specialChar = value =>
  value && !/^([a-zA-Z0-9\s]*)$/i.test(value) ?
  'No Special Characters' : undefined


const renderField = ({ input, label, type, meta: { touched, error }, placeholder }, ...custom) => (
  <div className = {'container'}>
    <div className ="group">
    <label>{label}</label>
      <input {...input} type={type} placeholder={label} className = {'text'} />
      {touched && error && <span>{error}</span>}
      <span className = { 'text-label' }>{ placeholder }</span>
      <span className ={ 'bar' }></span>
    </div>
  </div>
)

const renderDatePicker = ({ input, label, type, className, selected, meta: { touched, error } }) =>
  <DatePicker
    {...input}
        placeholder={'Start Date'}
        type={type}
        className={'calendar'}
        dropdownMode="select"
        dateForm="YYYY/MM/DD"
        selected={input.value ? moment(input.value) : null}
        onChange={date => input.onChange(moment(date).format('YYYY/MM/DD'))}
        required
  />

const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (

<div>
  <div>
    <form>
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

      <div key={index}>
        <br/>
        <GenericButton
          type='button'
          text="Remove Education"
          onClick={() => fields.remove(index)}
        />
        <h4>Education #{index + 1}</h4>
        <Field
          name={`${member}.school`}
          type="text"
          component={renderField}
          placeholder={ 'School' }
          validate={[required, specialChar]}

        />
        <Field
          name={`${member}.degree`}
          type="text"
          component={renderField}
          placeholder={ 'Degree' }
          validate={[required, specialChar]}

        />
        <Field
          name={`${member}.course`}
          type="text"
          component={renderField}
          placeholder={ 'Course' }
          validate={[required, specialChar]}

        />
        <Field
          name={`${member}.specialH`}
          type="text"
          component={renderField}
          placeholder={ 'Special Honors' }
          validate={[required, specialChar]}

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
          validate={[required]}

        />
        <label>End Date</label>
        <Field
          placeholder = {'End Date'}
          name={`${member}.endDate`}
          readOnly
          component={renderDatePicker}
          className = { 'calendar' }
          calendarClassName = { 'calendarClass' }
          validate={[required]}
        />
      </div>
      </div>
    ))}
  </form>

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
  form: 'form', // a unique identifier for this form
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true,
})(FieldArraysForm)
