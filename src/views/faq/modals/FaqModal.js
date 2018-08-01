import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton, CircularLoader } from '../../../ub-components/'

import './styles/faqModal.css'

class FaqModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { categoryName, details, onClick, onClose, title } = this.props
    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }>
        {
          details ?
            categoryName ?
            <div>
              <h4>{ title }</h4>
              <div dangerouslySetInnerHTML = {{ __html: details }}/>
              <GenericButton
                type = { 'button' }
                text = { `Proceed to ${categoryName} Benefits` }
                onClick = { onClick }
                className = { 'faqs-button' }
              />
            </div>
            :
            <div>
              <h4>{ title }</h4>
              <div dangerouslySetInnerHTML = {{ __html: details }}/>
            </div>
          :
          <center>
            <h3>Please wait...</h3>
            <CircularLoader show = { true } />
          </center>
        }
      </Modal>
    )
  }
}

FaqModal.propTypes = {
  categoryName: PropTypes.string,
  title: PropTypes.string,
  details: PropTypes.string,
  onClick: PropTypes.func,
  onClose: PropTypes.func
}

export default FaqModal
