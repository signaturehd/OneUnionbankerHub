import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    this.props.chosenCategory(id, feedbackCategory)
    this.props.onClose()
  }

  render () {
  const {  details, feedback, onClose, showCategoryModal, text, isDismisable } = this.props
  const { chosenCategory } = this.state
  console.log (feedback)
  return (
    <Modal
      onClose = { onClose }
      isDismisable = { true }
      chosenCategory = { chosenCategory } >
      <div className = { 'optical-description' }>
        <h2>Categories</h2>
      </div>
      <div className = { 'feedback-modal-footer' }>
        {
          feedback && feedback.map((category, key ) =>
          <GenericButton
              key = { key }
              feedback = { category }
              className = { 'feedback-modal-option-button' }
              text = { category.feedbackCategory}
              onClick = { () => this.submitData(category.id, category.feedbackCategory) }/>
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
