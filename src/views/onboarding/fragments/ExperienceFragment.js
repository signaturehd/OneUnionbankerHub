import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray, reduxForm } from 'redux-form'
import './styles/general.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'
import DatePicker from 'react-datepicker'
import moment from 'moment'



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
  />

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
        <Field
          name={`${member}.compName`}
          type="text"
          component={renderField}
          placeholder={ 'Company Name' }
        />
        <Field
          name={`${member}.address`}
          type="text"
          component={renderField}
          placeholder={ 'Address' }
        />
        <Field
          name={`${member}.position`}
          type="text"
          component={renderField}
          placeholder={ 'Position' }
        />
        <Field
          name={`${member}.expDescription`}
          type="text"
          component={'textarea'}
          className={ 'experience-textarea' }
          placeholder={ 'Brief description of duties' }
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
        <label>End Date</label>
        <Field
          placeholder = {'End Date'}
          name={`${member}.endDate`}
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
      <FieldArray name="experience" component={renderMembers} />
    </Card>
  )
}

export default reduxForm({
  form: 'form', // a unique identifier for this form
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true,
})(FieldArraysForm)
