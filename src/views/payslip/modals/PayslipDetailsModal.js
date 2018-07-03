import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/payslipModal.css'
import { Modal, Card, GenericButton } from '../../../ub-components/'
import Feedback from '../../benefitsfeedback/BenefitFeedbackModal'

class PayslipDetailsModal extends Component {

  constructor (props) {
    super(props)

    this.state={
      showFeedback: false
    }
  }

  render () {
    const { showFeedback }=this.state
    const { payslipResult, onClose, test, showPayslipDetails } = this.props

    return (

      <Modal
        isDismisable = { true }
        onClose = { onClose }
        showPayslipDetails = { true }
        >
        {
          showFeedback &&
          <Feedback
            isDismisable={ true }
            onClose={ () => this.setState({ showFeedback : false }) }/>
        }
          <Card className={ 'payslip-card-modal' }>
            <div className={ 'payslip-card-grid' }>
              <div>
                <h2>Date</h2>
              </div>
              <div>
                 { test ? test : '(Not Yet Provided)' }
              </div>
            </div>
            <div className={ 'payslip-card-grid' }>
              <div>
                <h2>Title</h2>
              </div>
              <div>
                 { test ? test : '(Not Yet Provided)' }
              </div>
            </div>
            <div className={ 'payslip-card-grid' }>
              <div>
                <h2>Gross</h2>
              </div>
              <div>
                 { test ? test : '(Not Yet Provided)' }
              </div>
            </div>
            <div className={ 'payslip-card-grid' }>
              <div>
                <h2>Deduction</h2>
              </div>
              <div>
                 { test ? test : '(Not Yet Provided)' }
              </div>
            </div>
            <div className={ 'payslip-card-grid' }>
              <div>
                <h2>Net Pay</h2>
              </div>
              <div>
                 { test ? test : '(Not Yet Provided)' }
              </div>
            </div>
            <br/>
            <br/>
            <center>
              <GenericButton
                text={ 'Report Issue' }
                onClick={ () => this.setState({ showFeedback : true,   }) }/>
            </center>
          </Card>
      </Modal>

    )
  }
}

PayslipDetailsModal.propTypes = {
  test : PropTypes.object,
  onClose : PropTypes.func
}

export default PayslipDetailsModal
