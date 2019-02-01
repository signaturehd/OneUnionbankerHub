import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/payslipModal.css'
import { Modal, Card, GenericButton, CircularLoader } from '../../../ub-components/'
// import Feedback from '../../benefitsfeedback/BenefitsFeedbackPayslipModal'

class Bir2316FileModal extends Component {

  constructor (props) {
    super(props)

    this.state={
      showFeedback: false,
      numPages: null,
      pageNumber: 1,
    }
  }

  onDocumentLoad (numPagess) {
     this.setState({ numPages })
  }

  render () {
    const { showFeedback, pageNumber, numPages }=this.state

    const {
      pdfFile,
      onClose,
      test,
      showPayslipDetails
    } = this.props


    return (

      <Modal
        isDismisable = { true }
        onClose = { onClose }
        width = { 70 }
        showPayslipDetails = { true }
        >

        {
          pdfFile ?
          <iframe src = {pdfFile}
            style = {{
              height: 400,
              width: '100%'
            }}
          >
          </iframe>
          :
          <center>
            <br/>
            <br/>
              <h3>Please wait...</h3>
            <br/>
            <br/>
              <CircularLoader show = {true} />
            <br/>
            <br/>
          </center>
        }
            <center>
            </center>
      </Modal>

    )
  }
}

Bir2316FileModal.propTypes = {
  test : PropTypes.object,
  onClose : PropTypes.func
}

export default Bir2316FileModal
