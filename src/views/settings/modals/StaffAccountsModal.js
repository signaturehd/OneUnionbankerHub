import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericButton,
  GenericInput,
  Modal,
  Line,
  ConfirmationModal,
  CircularLoader,
  FloatingActionButton,
  SingleInputModal
} from '../../../ub-components/'

import './styles/staffAccountModal.css'

import * as func from '../functions/SettingFunctions'

class StaffAccountsModal extends Component {

  constructor (props) {
    super(props)
    this.state={
      isDismisable : true,
      showTypeModal : false,
      showCapacityModal : false,
      showConfirmationModal : false,
      employeeName : '',
      selectedAccountNumber : '',
      sequence : '',
      fullName : '',
      accountNumber : '',
      accountType : '',
      accountTypeCode : '',
      accountCapacity : '',
      accountCapacityCode : '',
      accountRemarks: '',
      accountTypeObject : [
      {
        id : 'CA',
        name : 'Current'
      },{
        id : 'EO',
        name : 'EON'
      },{
        id : 'OT',
        name : 'Others'
      }, {
        id : 'SA',
        name : 'Savings'
      }, {
        id : 'TD',
        name : 'Time Deposit'
      }, {
        id : 'TE',
        name : 'Treasury'
      }, {
        id : 'TU',
        name : 'Trust'
      }],
    accountCapacityObject : [
      {
        id : 'CS',
        name : 'Corp. Signatory'
      },{
        id : 'JO',
        name : 'Joint'
      },{
        id : 'OT',
        name : 'Others'
      }, {
        id : 'SI',
        name : 'Single'
      }]
    }
  }

  componentDidMount () {
    this.props.getForConfirmation()
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.showSuccessModal === true) {
      this.setState({
        accountNumber: '',
        accountType: '',
        accountCapacity : '',
        accountRemarks: ''
      })
    }
  }

  confirmationModal (showConfirmationModal, employeeName, selectedAccountNumber, sequence) {
    this.setState({ showConfirmationModal, employeeName, selectedAccountNumber, sequence })
  }

  getAccountType (type) {
    var upperCaseType = type.toUpperCase()
    var ret = upperCaseType
    if(upperCaseType == 'CA') {
      ret = 'Current Account'
    } else if (upperCaseType == 'EO') {
      ret = 'EON'
    } else if (upperCaseType == 'OT') {
      ret = 'Others'
    } else if (upperCaseType == 'SA') {
      ret = 'Savings Account'
    } else if (upperCaseType == 'TD') {
      ret = 'Time Dep'
    } else if (upperCaseType == 'TE') {
      ret = 'Treasury'
    } else if (upperCaseType == 'TU') {
      ret = 'Trust'
    } else if (upperCaseType == 'CC') {
      ret = 'Credit Card'
    }
    return ret
  }

  validateInputNumber (number) {
    const validate = func.checkedValidateInputNumber(number)
    this.setState({ accountNumber : validate })
  }

  render () {
    const {
      onClose,
      staffLoader,
      staffAccounts,
      onClickEmployeeConfirmation,
      onUpdateStaffAccounts,
      hideStaffAccountModalFunc ,
      enabledStaffLoader,
      staffResponseMessage,
      showSuccessModal,
      name,
    }=this.props

    const {
     fullName,
     accountNumber,
     accountType,
     accountTypeCode,
     accountTypeObject,
     showTypeModal,
     accountCapacity,
     accountCapacityCode,
     accountCapacityObject,
     showCapacityModal,
     accountRemarks,
     isDismisable,
     enabledLoader,
     employeeName,
     selectedAccountNumber,
     sequence,
     showAddComponent,
     showConfirmationModal
    }=this.state

    return (
      <Modal
        isDismisable = { isDismisable }
        onClose = { onClose }
        >
        {
          showSuccessModal &&
          <Modal>
            <center>
              <h2>{ staffResponseMessage }</h2>
              <br/>
              <GenericButton
                text = { 'Ok' }
                onClick = { () => this.props.onCloseStaffResponse() }
                />
            </center>
          </Modal>
        }
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
                    onUpdateStaffAccounts(employeeName, selectedAccountNumber, sequence)
                    this.setState({ showConfirmationModal : false })
                    }
                  }
                />
              </div>
            </center>
          </Modal>
        }
        {
          showTypeModal &&
          <SingleInputModal
            label = { 'Account Type' }
            inputArray = { accountTypeObject }
            selectedArray = { (accountTypeCode, accountType) =>
              this.setState({ accountTypeCode, accountType, showTypeModal: false }) }
            onClose = { () =>
              this.setState({ showTypeModal : false }) }
            />
        }
        {
          showCapacityModal &&
          <SingleInputModal
            label = { 'Account Capacity' }
            inputArray = { accountCapacityObject }
            selectedArray = { (accountCapacityCode, accountCapacity) =>
              this.setState({ accountCapacityCode, accountCapacity, showCapacityModal: false }) }
            onClose = { () =>
              this.setState({ showCapacityModal : false }) }
            />
        }
        {
          showAddComponent ?
          <div>
            {
              enabledStaffLoader ?

              <center>
                <br/>
                <h2>Please wait while we we&#39;re validating the creation of staff accounts</h2>
                <br/>
                <CircularLoader  show = { enabledStaffLoader }/>
                <br/>
              </center> :
              <div>
                <h2 className={ 'font-weight-normal' }>ADD STAFF ACCOUNTS</h2>
                <br/>
                  <GenericInput
                    text = { 'Account Number' }
                    maxLength = { 12 }
                    value = { accountNumber }
                    hint = { '(e.g 109350022082)' }
                    onChange = { (e) =>
                      this.validateInputNumber(e.target.value)
                     }
                    />
                  <GenericInput
                    text = { 'Account Type' }
                    value = { accountType }
                    onClick = { () => this.setState({ showTypeModal : true }) }
                    />
                  <GenericInput
                    text = { 'Account Capacity' }
                    value = { accountCapacity }
                    onClick = { () => this.setState({ showCapacityModal : true }) }
                    />
                  <GenericInput
                    text = { 'Account Remarks' }
                    maxLength = { 30 }
                    value = { accountRemarks }
                    onChange = { (e) => this.setState({ accountRemarks : e.target.value }) }
                    />
                  <br/>
                <div className = { 'grid-global' }>
                  <GenericButton
                    text = { 'Cancel' }
                    onClick = { () => this.setState({ showAddComponent : false }) }
                    />
                  <GenericButton
                    text = { 'Save' }
                    onClick = { () => {
                      this.setState({ showAddComponent : false })
                      onClickEmployeeConfirmation(
                        name,
                        accountNumber,
                        accountTypeCode,
                        accountCapacityCode,
                        accountRemarks,
                      )}
                    }
                    />
                </div>
                <br/>
              </div>
            }

          </div>
          :
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
                staffAccounts &&
                staffAccounts.map(
                  (resp, key) => (
                    <div className={ `back-color-default staff-account-card back-color-${resp.line2}` }>
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
                          onClick = { () => this.confirmationModal(true, resp.employeeName, resp.account.number, resp.sequence) }
                          disabled = { resp.status.toLowerCase() === 'confirmed' ? true : false  }
                          className = { resp.status.toLowerCase() === 'confirmed' ? 'confirmed-button' : 'not-confirmed-button' }
                        />
                      </div>
                    </div>
                  )
                )
              }
              </div>
            }
            <FloatingActionButton
              text = { '+' }
              onClick = { () => this.setState({ showAddComponent : true }) }
              />
          </div>
        }

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
