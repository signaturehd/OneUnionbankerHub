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
    <center><h4> Experience </h4></center>
      <center>
        <GenericButton className={'generic-button'}
        type="button"
        onClick={() => fields.push({})}
        text= {'Add Experience'}
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
              text="Remove Experience"
              onClick={() => fields.remove(index)}
            />

        <h4>Experience #{index + 1}</h4></center>

        <GenericTextBox
          placeholder = {'Company Name'}
          maxLength={60}
        />
        <GenericTextBox
          placeholder = {'Company Address'}
          maxLength={60}
        />
        <GenericTextBox
          placeholder = {'Position'}
          maxLength={60}
        />
        <textarea
          className = { 'experience-textarea' }
          placeholder = { 'Brief Description of duties' }
        />
        <center>
        <div> <h4> Inclusive Dates </h4>
        <label>Start Date</label>
        <Field
          placeholder = {'Start Date'}
          name={`${member}.startDate`}
          readOnly
          component={renderDatePicker}
          className = { 'calendar' }
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          calendarClassName = { 'calendarClass' }
        />
        <label>End Date</label>
        <Field
          placeholder = {'End Date'}
          name={`${member}.endDate`}
          readOnly
          component={renderDatePicker}
          className = { 'calendar' }
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          calendarClassName = { 'calendarClass' }
        />
        <br/>
        </div>
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
      <FieldArray name="experience" component={renderMembers} />
    </div>
  )
}

export default reduxForm({
  form: 'form', // a unique identifier for this form
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true,
})(FieldArraysForm)
