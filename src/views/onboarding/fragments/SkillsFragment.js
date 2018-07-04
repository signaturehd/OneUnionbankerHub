import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray, reduxForm } from 'redux-form'
import './styles/general.css'
import { GenericTextBox, Card, GenericButton, FileUploader, Modal } from '../../../ub-components/'
import DatePicker from 'react-datepicker'
import moment from 'moment'

const levels = ['Not Applicable', 'Fundamental Awareness', 'Novice', 'Intermediate', 'Advanced', 'Expert']

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

const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
<div >
  <center><h4> Skills </h4></center>
    <center>
      <GenericButton className={'generic-button'}
        type="button"
        onClick={() => fields.push({})}
        text= {'Add Skill'}
      />
    </center>
    <br/>
    <div>
      <div>
        <form className = 'educ-form-container'>
          {fields.map((member, index) => (
            <Card key={index}>
              <br/>
              <center>
                <GenericButton
                  type='button'
                  text="Remove Skill"
                  onClick={() => fields.remove(index)}
            />
              <h4>Skill #{index + 1}</h4></center>

                <GenericTextBox
                  placeholder = {'Skill Name'}
                  maxLength={60}
                />
                <br/>
                <center>
                  <Field
                    name={`${member}.skillLvl`}
                    type="text"
                    component={renderSkillLvl}
                    placeholder={ 'Skill Level' }
                  />
                  <br/>
                </center>
              </Card>
            ))}
          </form>
        </div>
      </div>
    </div>
  )
  
const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting, previousPage } = props
  return (
    <div onSubmit={handleSubmit}>
      <FieldArray name="skills" component={renderMembers} />
    </div>
  )
}

export default reduxForm({
  form: 'form', // a unique identifier for this form
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true,
})(FieldArraysForm)
