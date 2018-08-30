import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericButton, Modal, Line, ConfirmationModal, CircularLoader } from '../../../ub-components/'
import StaffAccountCardComponent from '../components/StaffAccountCardComponent'
import './styles/staffAccountModal.css'

class StaffAccountsModal extends Component {

  constructor (props) {
    super(props)
    this.state={
      isDismisable : true,
      showConfirmationModal : false,
      employeeName : '',
      sequence : '',
    }
  }

  componentDidMount () {
    const {
      getStaffAccounts,
      employeeNumber
    } = this.props

    getStaffAccounts(employeeNumber)
  }

  confirmationModal (showConfirmationModal, employeeName, sequence) {
    this.setState({ showConfirmationModal, employeeName, sequence })
  }

  getAccountType (type) {
    var ret = ''
    if(type == 'CA') {
      ret = 'Current'
    } else if (type == 'EO') {
      ret = 'EON'
    } else if (type == 'OT') {
      ret = 'Others'
    } else if (type == 'SA') {
      ret = 'Savings'
    } else if (type == 'TD') {
      ret = 'Time Dep'
    } else if (type == 'TE') {
      ret = 'Treasury'
    } else if (type == 'TU') {
      ret = 'Trust'
    }
    return ret
  }

  render () {
    const {
      onClose,
      staffLoader,
      staffAccounts,
      onClickEmployeeConfirmation
    }=this.props

    const {
      isDismisable,
      showConfirmationModal,
      enabledLoader,
      employeeName,
      sequence
    }=this.state

    return (
      <Modal
        isDismisable = { isDismisable }
        onClose = { onClose }
        >
        {
          showConfirmationModal &&
          <Modal>
            <center>
              <h2>Are you sure you want to confirm the chosen account?</h2>
              <br/>
              <div className = { 'grid-global' }>
                <GenericButton
                  text = { 'No' }
                  onClick = { () => this.setState({ showConfirmationModal : false }) }
                  />
                <GenericButton
                  text = { 'Yes' }
                  onClick = { () => {
                    onClickEmployeeConfirmation(employeeName, sequence)
                    this.setState({ showConfirmationModal : false })
                  }
                }
                />
              </div>
            </center>
          </Modal>
        }
        <div>
          <div>
          <br/>
            <h2 className={ 'font-weight-normal' }>STAFF ACCOUNTS</h2>
            <p className={ 'modal-description' }>If you find any discrepancy in your account number, please visit any UnionBank branch.</p>
            <Line/>
            <br/>
          </div>

          {
            staffLoader ?
            <center>
              <CircularLoader show = { true }/>
            </center> :
            <div className={ 'staff-account-body' }>
            {
              staffAccounts && staffAccounts.map(
                (resp, key) => (
                  <div className={ `staff-account-card back-color-${resp.line2}` }>
                    <div className = { 'staff-account-card-details' }>
                      <div className = { 'staff-account-card-icon staff-account-card-icon-card' }>
                      </div>
                      <div>
                        <h3 className = { 'staff-account-card-title' }>{ resp.employeeName }</h3>
                        <h3 className = { 'staff-account-card-description' }>{ this.getAccountType(resp.line2) }</h3>
                      </div>
                    </div>
                    <br/>
                    <div className = { 'staff-account-grid-2' }>
                      <h3 className = { 'staff-account-card-number' }>{ resp.account.number }</h3>
                      <GenericButton
                        text = { resp.status }
                        onClick = { () => this.confirmationModal(true, resp.employeeName, resp.sequence) }
                        disabled = { resp.status.toLowerCase() === 'confirmed' ? true : false  }
                        className = { 'confirmed-button' }
                      />
                    </div>
                  </div>
                )
              )
            }

            </div>
          }
        </div>
      </Modal>
      )
    }
  }
StaffAccountsModal.propTypes={
  onClose : PropTypes.func,
  onClickEmployeeConfirmation : PropTypes.func,
}
StaffAccountsModal.defaultProps={
}

export default StaffAccountsModal
