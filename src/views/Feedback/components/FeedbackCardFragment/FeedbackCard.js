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
      feedback:'',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
  }

  handleChange (event) {
    this.setState({ feedback: event.target.feedback })
  }

  render () {
    const {
      text,
      onFocus,
      onClose,
      submit,
      onClick,
      details,
      category,
      submitForm
    } = this.props

    const {  showCategoryModal, feedback } = this.state
    console.log(feedback)


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
      <form onSubmit = { this.handleSubmit }>
        <div className = {'feedback-header'} >
          <h1> Feedback </h1>
        </div>
          <center>
          <div style = {styleImage.image1} className = {'image'}> </div>
          </center>
          <div className = {'feedback-body '}>
               <GenericTextBox
                 value = { category && category }
                 readOnly
                 type = { 'button' }
                 onClick = { () => onClick(true)}
                 placeholder = { text } />

                <textarea name="textarea" id="textarea" className ={'textArea'} feedback= {this.state.feedback} placeholder ={'We would like to hear from you.'} onChange={this.handleChange} cols={40} rows={10} />
                <br/>
                <p> Send us any comment, suggestions, feedback or problems you've<br/>
                encountered within the site so we can fix it right away.</p>
          </div>
        <div className = {'feedback-footer-left'}>
          <GenericButton
            type = {'button'}
            className = { 'feedback-button' }
            onClick = { submitForm }
            text = { submit }/>
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
  text   : PropTypes.string,
  submit  : PropTypes.string,
}

FeedbackCard.defaultProps = {
  text   : 'What was it About?',
  submit : 'Submit'
}

export default FeedbackCard
