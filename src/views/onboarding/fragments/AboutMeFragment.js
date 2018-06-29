import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray, reduxForm } from 'redux-form'
import './styles/general.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import ImgPrevUploader from '../components/ImgPrevUploader'


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
const renderFileUp = ({ input, type, field, value, files, placeholder,meta: { touched, error, warning } }) => (
  <ImgPrevUploader/>
)

const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0])

const FileInput = ({
  input: {
    value: omitValue,
  onChange,
  onBlur,
  ...inputProps,
  },
  meta: omitMeta,
  ...props,
}) =>
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />


const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
<div>
  <div>
    <form>
      <h4> About Me </h4>
    <div className={ 'general-form-card-body' }>
      <GenericButton className={'generic-button'}
        type="button"
        onClick={() => fields.length <= 0 && fields.push({})}
        text= {'Add About Me'}
      >
      </GenericButton>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </div>
    {fields.map((member, index) => (

      <div key={index}>
        <br/>
        <GenericButton
          type='button'
          text="Remove About Me"
          onClick={() => fields.remove(index)}
        />
        <h4>About Me </h4>
         <Field
            name={`${member}.profpic`}
            type='file' component={renderFileUp}
           validate={[required, specialChar]}
          />
         <Field
          name={`${member}.whoami`}
          type="text"
          component={'textarea'}
          className={ 'whoami-textarea' }
          placeholder={ 'Brief description of you' }
          validate={[required, specialChar]}
        />
      </div>
    ))}
  </form>
</div>
</div>
)
const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting, previousPage } = props
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
