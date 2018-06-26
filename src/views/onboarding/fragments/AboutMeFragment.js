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

const field_file = ({ input, type, field, value, placeholder,meta: { touched, error, warning } }) => (
  <div className = {'file-container'}>
    <div className ="file-group">
  <input type="file" {...field} className = {'file'}/>
  <span className = { 'file-text' }> { value } </span>
      <span className = { 'file-label' }>{ placeholder }</span>
      <span className ={ 'bar' }></span>
    </div>
  </div>
)


const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
<div>
  <div>
    <Card>
      <h4> About Me </h4>
    <div className={ 'general-form-card-body' }>
      <GenericButton className={'generic-button'}
        type="button"
        onClick={() => fields.push({})}
        text= {'Add About Me'}
      >
      </GenericButton>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </div>
    {fields.map((member, index) => (

      <div className={'general-form-card'} key={index}>
        <GenericButton
          type='button'
          text="Remove About Me"
          onClick={() => fields.remove(index)}
        />
        <h4>About Me #{index + 1}</h4>

         <Field   name={`${member}.profpic`} type='file' component={field_file} />


        <Field
          name={`${member}.whoami`}
          type="text"
          component={'textarea'}
          className={ 'whoami-textarea' }
          placeholder={ 'Brief description of you' }
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
      <FieldArray name="ABoutMe" component={renderMembers} />
    </Card>
  )
}

export default reduxForm({
  form: 'form', // a unique identifier for this form
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true,
})(FieldArraysForm)
