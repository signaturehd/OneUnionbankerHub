import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray, reduxForm } from 'redux-form'
import './styles/general.css'
import { GenericTextBox, Card, GenericButton, FileUploader, Modal } from '../../../ub-components/'
import DatePicker from 'react-datepicker'
import moment from 'moment'

const levels = ['Not Applicable', 'Fundamental Awareness', 'Novice', 'Intermediate', 'Advanced', 'Expert']


const required = value => value ? undefined : 'Required'
const minLength = min => value =>
  value && value.length > min ? `Must be ${max} characters or more` : undefined
const maxLength15 = minLength(0)
const specialChar = value =>
  value && !/^([a-zA-Z0-9\s]*)$/i.test(value) ?
  'No Special Characters' : undefined

const renderSkillLvl = ({ input,  meta: { touched, error } }) => (
  <div className= {'select'}>
    <select className = {'select-text'} {...input}>
      <option value="">Select Skill Level...</option>
      {levels.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
    <span class="select-highlight"></span>
          <span class="select-bar"></span>
    {touched && error && <span>{error}</span>}
  </div>
)

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

const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
<div>
  <div>
    <form>
      <h4> Skills </h4>
    <div>
      <br/>
      <GenericButton className={'generic-button'}
        type="button"
        onClick={() => fields.push({})}
        text= {'Add Skill'}
      >
      </GenericButton>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </div>
    {fields.map((member, index) => (

      <div key={index}>
        <GenericButton
          type='button'
          text="Remove Skill"
          onClick={() => fields.remove(index)}
        />
        <h4>Skill #{index + 1}</h4>
        <Field
          name={`${member}.skillName`}
          type="text"
          component={renderField}
          placeholder={ 'Skill Name' }
          validate={[required, specialChar]}
        />
        <br/>
        <center>
        <Field
          name={`${member}.skillLvl`}
          type="text"
          component={renderSkillLvl}
          placeholder={ 'Skill Level' }
          validate={[required, specialChar]}
        />
      </center>
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
      <FieldArray name="skills" component={renderMembers} />
    </Card>
  )
}

export default reduxForm({
  form: 'form', // a unique identifier for this form
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true,
})(FieldArraysForm)
