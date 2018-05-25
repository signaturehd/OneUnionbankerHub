import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './feedback-styles.css'
import { GenericTextBox, GenericButton, Card } from '../../../../ub-components'
import TextArea from '../../components/TextArea/TextArea'
import FeedbackCategoryModal from '../../modals/FeedbackCategoryModal'


class FeedbackCard extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showCategoryModal : false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
  }

  
  render () {
    const {
      text,
      onFocus,
      feedback,
      onClose,
      submit,
      receipient,
      branch,
      onClick,
      submitForm,
      details,
      category
    } = this.props

    const {  showCategoryModal } = this.state
    console.log(details)
    return (
      <Card className={ 'feedback-card' }>
      <form onSubmit = { this.handleSubmit }>
        <div className = {'feedback-header'} >
          <h1 > Feedback </h1>
          <div className = {'feedback-body '}>
            
          <div className = { 'feedback-col span_1_of_3' }>
          <center>
               <GenericTextBox
                 value = { category && category }
                 readOnly
                 onClick = { () => onClick( true)}
                 placeholder = { text } />
                 <TextArea/>
          </center>
          </div>
         
          </div>
        </div>
        <div className = {'feedback-footer-left'}>
          <GenericButton
            onClick = { () => onClick(false, false, true)}
            type = {'button'}
            text = { submit }
            className = {'feedback-procedure' }
            value = { 'Categories' } />
        </div>
      </form>
    </Card>
    )
  }
}

FeedbackCard.propTypes = {
  onClose : PropTypes.func,
  onClick : PropTypes.func,
  details: PropTypes.array,
  feedback : PropTypes.array,
  text   : PropTypes.string,
  submit  : PropTypes.string,
}

FeedbackCard.defaultProps = {
  text   : 'Categories',
  submit : 'Submit'
}

export default FeedbackCard
