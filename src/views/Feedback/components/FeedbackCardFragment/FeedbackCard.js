import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './feedback-styles.css'
import { GenericTextBox, GenericButton, Card } from '../../../../ub-components'
import FeedbackCategoryModal from '../../modals/FeedbackCategoryModal'
import staticImage from '../../../../images/feedback.jpg'



class FeedbackCard extends Component{

  constructor (props) {
    super(props)
    this.state = {
      showCategoryModal : false,
      value:'',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
  }


  render () {
    const {
      onClick,
      submit,
      feedback,
      submitForm
    } = this.props

    const {
      showCategoryModal
    } = this.state

    const styleImage = {
        image1 : {
          backgroundImage: `url('${staticImage}')`,
          width : '90px',
          height : '90px',
          backgroundSize : 'cover',
          backgroundRepeat : 'no-repeat',
        }
      }
    return (
      <Card className={ 'feedback-card' }>
        <div className = {'feedback-header'} >
          <h1 > Feedback </h1>
            <div className = {'feedback-body '}>
              <div className = { 'feedback-col span_1_of_3' }>
                <center>
                 <GenericTextBox
                   value = { feedback && feedback }
                   readOnly
                   onClick = { () => onClick(true)}
                   placeholder = { 'Feedback Title' }
                 />
                  <TextArea/>
                </center>
                </div>
              </div>
            </div>
            <div className = {'feedback-footer-left'}>
              <GenericButton
                onClick = { () => submitForm() }
                type = {'button'}
                text = { submit }
                className = {'feedback-procedure' }
                value = { 'Procedures' } />
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
