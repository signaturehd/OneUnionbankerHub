import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './feedback-modal.css'
import { Modal , GenericButton} from '../../../ub-components/'

class FeedbackCategoryModal extends Component {
  constructor (props) {
    super(props)
      this.state = {
        chosenCategory : []
      }
    this.submitData = this.submitData.bind(this)
  }

  submitData (id, feedbackCategory) {
    this.props.onChange(id, feedbackCategory)
    this.props.onClose()
  }

  render () {
  const {
    details,
    onClose,
    showCategoryModal,
    text,
    isDismisable
  } = this.props

  const {
    chosenCategory
  } = this.state

  return (
    <Modal
      onClose = { onClose }
      isDismisable = { true }
      chosenCategory = { chosenCategory } >
      <div className = { 'feedback-description' }>
        <h2>Categories</h2>
      </div>
      <div className = { 'feedback-modal-footer' }>
        {
          feedback && feedback.map((category, key ) =>
          <GenericButton
              key = { key }
              feedback = { category }
              className = { 'feedback-modal-option-button' }
              text = { details.feedbackCategory }
              onClick = { () => this.submitData(details.id, details.feedbackCategory) }/>
          )
        }
      </div>
    </Modal>
    )
  }
}
FeedbackCategoryModal.propTypes = {
  onClose : PropTypes.func,
  feedback : PropTypes.array,
}
FeedbackCategoryModal.defaultProps = {
}
export default FeedbackCategoryModal
