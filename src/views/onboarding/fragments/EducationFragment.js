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
        selected={input.value ? moment(input.value) : null}
        onChange={date => input.onChange(moment(date).format('YYYY/MM/DD'))}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        required
  />

const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
<div >
  <center><h4> Education </h4></center>
    <center>
      <GenericButton className={'generic-button'}
      type="button"
      onClick={() => fields.push({})}
      text= {'Add Education'}
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
            text="Remove Education"
            onClick={() => fields.remove(index)}
          />

      <h4>Education #{index + 1}</h4></center>

        <GenericTextBox
          placeholder = {'School'}
          maxLength={60}
        />
        <GenericTextBox
          placeholder = {'Degree'}
          maxLength={60}
        />
        <GenericTextBox
          placeholder = {'Course'}
          maxLength={60}
        />
        <GenericTextBox
          placeholder = {'Special Honors'}
          maxLength={60}
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
          calendarClassName = { 'calendarClass' }
          peekNextMonth
          showMonthDropdown
          showYearDropdown
        />
        <label>End Date</label>
        <Field
          placeholder = {'End Date'}
          name={`${member}.endDate`}
          readOnly
          component={renderDatePicker}
          className = { 'calendar' }
          calendarClassName = { 'calendarClass' }
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          validate={[required]}
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
    <div onSubmit={handleSubmit} >
      <FieldArray name="Education" component={renderMembers} />

    </div>
  )
}
export default reduxForm({
  form: 'form', // a unique identifier for this form
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true,
})(FieldArraysForm)
