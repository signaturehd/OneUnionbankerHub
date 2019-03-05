import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/feedbackStyles.css'
import {
  GenericInput,
  GenericButton,
  CircularLoader } from '../../../../ub-components'
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
  /* initital*/
  render () {
    const {
      onClick,
      submit,
      feedbackCategory,
      submitForm,
      showFeedback,
    } = this.props

    const {
      showCategoryModal,
      feedbackTextareaValue,
      onSubmit
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
      <div className = { 'feedback-card' }
        feedbackTextareaValue = { feedbackTextareaValue }
         >
          {
            showFeedback ?
            <div>
              <div className = { 'feedback-header' } >
                <div className = { 'feedback-body' }>
                <br/>
                  <div className = { 'feedback-col span_1_of_3' }>
                    <GenericInput
                     value = { feedbackCategory ? feedbackCategory : '' }
                     onClick = { () => onClick(true) }
                     text = { 'Feedback Category' }
                     readOnly
                   />
                  </div>
                  <textarea
                    onChange = { e => this.getTextareaValue(e.target.value) }
                    className = { 'feedback-textarea' }
                    placeholder = { 'Let us know more...' }
                    value = { feedbackTextareaValue ? feedbackTextareaValue : '' }
                  />
                </div>
              </div>
              <center>
                <GenericButton
                  onClick = { () => {
                     submitForm(feedbackTextareaValue, false),
                     this.setState({ feedbackTextareaValue : null })
                    }
                  }
                  type = { 'button' }
                  text = { submit }
                  className = {'feedback-procedure' }
                  value = { 'Procedures' }
                />
              </center>
            </div>            :
            <center>
              <CircularLoader show = {true}/>
            </center>
          }

      </div>
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
