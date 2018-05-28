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
      <div className = { 'optical-description' }>
        <h2>Recipients</h2>
      </div>
      <div className = { 'feedback-modal-footer' }>
        {
          details.map((details, key ) =>
          <GenericButton
              key = { key }
              details = { details }
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
  details : PropTypes.array,

}
FeedbackCategoryModal.defaultProps = {
}
export default FeedbackCategoryModal
