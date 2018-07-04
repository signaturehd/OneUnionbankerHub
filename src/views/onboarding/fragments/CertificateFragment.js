import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray, reduxForm } from 'redux-form'
import './styles/general.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'
import DatePicker from 'react-datepicker'
import moment from 'moment'


const renderDatePicker = ({ input, label, type, className, selected, meta: { touched, error } }) =>
  <DatePicker
    {...input}
        placeholder={'Start Date'}
        type={type}
        className={'calendar'}
        dropdownMode="select"
        dateForm="YYYY/MM/DD"
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        selected={input.value ? moment(input.value) : null}
        onChange={date => input.onChange(moment(date).format('YYYY/MM/DD'))}
  />

  const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
  <div >
    <center><h4> Certificate </h4></center>
      <center>
        <GenericButton className={'generic-button'}
        type="button"
        onClick={() => fields.push({})}
        text= {'Add Certificate'}
      />
      </center>
      <br/>
      <div>
        <div>
          <div>
            {(touched || submitFailed) && error && <span>{error}</span>}
          </div>

    <form className = 'educ-form-container'>
      {fields.map((member, index) => (
        <Card key={index}>
          <br/>
          <center>
            <GenericButton
              type='button'
              text="Remove Certificate"
              onClick={() => fields.remove(index)}
            />

        <h4>Certificate #{index + 1}</h4></center>

        <GenericTextBox
          placeholder = {'Certificate Name'}
          maxLength={60}
        />

        <GenericTextBox
          placeholder = {'Issuing Body'}
          maxLength={60}
        />
      <center>
        <label>Date Issued</label>
        <Field
          placeholder = {'Start Date'}
          name={`${member}.startDate`}
          readOnly
          component={renderDatePicker}
          className = { 'general-calenar' }
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          calendarClassName = { 'calendarClass' }
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
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div onSubmit={handleSubmit}>
      <FieldArray name="certificate" component={renderMembers} />
    </div>
  )
}

export default reduxForm({
  form: 'form', // a unique identifier for this form
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true,
})(FieldArraysForm)
