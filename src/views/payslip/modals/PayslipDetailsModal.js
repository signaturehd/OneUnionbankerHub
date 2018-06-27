import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/payslipModal.css'
import { Modal, Card } from '../../../ub-components/'

class PayslipDetailsModal extends Component {

  constructor(props) {
    super(props)
    this.state={
      showPayslipDetails: false,
    }
  }

  render () {

    const { showPayslipDetails }=this.state
    const { gross, title, date, netPay, onClose, deduction }=this.props

    return (

      <Modal
        isDismisable = { true }
        onClose = { onClose }
        >
          <Card className={ 'payslip-card-modal' }>
            <div className={ 'payslip-card-grid' }>
              <div>
                <h2>Date</h2>
              </div>
              <div>
                 { date ? date : '(Not Yet Provided)' }
              </div>
            </div>
            <div className={ 'payslip-card-grid' }>
              <div>
                <h2>Title</h2>
              </div>
              <div>
                 { title ? title : '(Not Yet Provided)' }
              </div>
            </div>
            <div className={ 'payslip-card-grid' }>
              <div>
                <h2>Gross</h2>
              </div>
              <div>
                 { gross ? gross : '(Not Yet Provided)' }
              </div>
            </div>
            <div className={ 'payslip-card-grid' }>
              <div>
                <h2>Deduction</h2>
              </div>
              <div>
                 { deduction ? deduction : '(Not Yet Provided)' }
              </div>
            </div>
            <div className={ 'payslip-card-grid' }>
              <div>
                <h2>Net Pay</h2>
              </div>
              <div>
                 { netPay ? netPay : '(Not Yet Provided)' }
              </div>
            </div>
          </Card>
      </Modal>

    )
  }
}

PayslipDetailsModal.propTypes={
  gross : PropTypes.object,
  title : PropTypes.object,
  date : PropTypes.object,
  netPay : PropTypes.object,
  onClose : PropTypes.func,
}

export default PayslipDetailsModal
