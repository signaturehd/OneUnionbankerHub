import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './feedback-styles.css'
import { GenericTextBox, GenericButton, Card } from '../../../../ub-components'
import FeedbackCategoryModal from '../../modals/FeedbackCategoryModal'
import staticImage from '../../../../images/feedback.jpg'

class FeedbackCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showCategoryModal : false,
      feedbackTextareaValue: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getTextareaValue = this.getTextareaValue.bind(this)
  }
  /* get Textarea Value as state*/
  getTextareaValue (feedbackTextareaValue) {
    this.setState({ feedbackTextareaValue })
  }

  handleSubmit (e) {
    e.preventDefault()
  }
  /*initital*/
  render () {
    const {
      onClick,
      submit,
      feedbackCategory,
      submitForm,
    } = this.props

    const {
      showCategoryModal,
      feedbackTextareaValue
    } = this.state

    const styleImage = {
      image1 : {
        backgroundImage : `url('${staticImage}')`,
        width : '90px',
        height : '90px',
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat',
      }
    }
    return (
      <Card className = { 'feedback-card' }
        feedbackTextareaValue = { feedbackTextareaValue }
         >
        <div className = { 'feedback-header' } >
          <h2> Feedback </h2>
          <div className = { 'feedback-body' }>
            <div className = { 'feedback-col span_1_of_3' }>
            <center>
              <GenericTextBox
               value = { feedbackCategory && feedbackCategory }
               readOnly
               onClick = { () => onClick(true)}
               placeholder = { 'Feedback Title' }
             />
            </center>
            </div>
            <textarea
              onChange = { e => this.getTextareaValue(e.target.value) }
              className = { 'feedback-textarea' }
              placeholder = { 'Enter Feedback' }
              value = { feedbackTextareaValue }
            />
          </div>
        </div>
        <div className = {'feedback-footer-left'}>
          <GenericButton
            onClick = { () => submitForm(feedbackTextareaValue) }
            type = { 'button' }
            text = { submit }
            className = {'feedback-procedure' }
            value = { 'Procedures' }
          />
        </div>
      </Card>
    )
  }
}

FeedbackCard.propTypes = {
  onClick : PropTypes.func,
  submit  : PropTypes.string,
}

FeedbackCard.defaultProps = {
  submit : 'Submit'
}

export default FeedbackCard
