import React, { Component } from 'react'
import PropTypes from 'prop-types'
import store from '../../../../store'
import { NotifyActions } from '../../../../actions'

import {
  Modal,
  GenericButton,
  GenericInput,
  DatePicker,
  SingleInputModal
} from '../../../../ub-components/'

import { format } from '../../../../utils/numberUtils'

import imageDefault from '../../../../images/profile-picture.png'

import { RequiredValidation } from '../../../../utils/validate/'

class FinancialObligationModal extends Component {

  constructor (props) {
    super (props)
  }

  render () {
    const {
      bankNameInstitutionFunc,
      natureObligationFunc,
      amountFunc,
      statusNameFunc,
      submitForm,
      hideModalEducationFormFunc,
      bankNameInstitutionErrorMessage,
      natureObligationErrorMessage,
      amountErrorMessage,
      statusNameErrorMessage,
      showFinanceStatusErrorMessage,
      statusName,
      bankNameInstitution,
      natureObligation,
      amount,
      onClose,
      showFinanceStatusModal,
      financeStatusFunc,
      financeStatus,
      showFinanceStatusModalFunc,
      editForm,
      editMode
    } = this.props

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }>
        {
          showFinanceStatusModal &&
          <SingleInputModal
            label = { 'Finance Status' }
            inputArray = { financeStatus && financeStatus }
            selectedArray = { (statusId, statusName) =>
              financeStatusFunc(
                statusId,
                statusName,
                false,
                ''
              )
            }
            onClose = { () => showFinanceStatusModalFunc() }
          />
        }
        <h2>Financial Obligation Form</h2>
        <div>
          <GenericInput
            text = { 'Name of the Bank/ Financial Institution' }
            value = { bankNameInstitution }
            maxLength = { 30 }
            onChange = { (e) => bankNameInstitutionFunc(e.target.value) }
            errorMessage = { bankNameInstitution ? '' : bankNameInstitutionErrorMessage }
            />
          <GenericInput
            text = { 'Nature of Obligation' }
            value = { natureObligation }
            maxLength = { 20 }
            onChange = { (e) => natureObligationFunc(e.target.value) }
            errorMessage = { natureObligation ? '' : natureObligationErrorMessage }
            />
          <GenericInput
            text = { 'Amount' }
            value = { (amount) }
            type = { 'number' }
            onChange = { (e) => amountFunc(e.target.value) }
            errorMessage = { amount ? '' : amountErrorMessage }
            maxLength = { 12 }
            />
          <GenericInput
            text = { 'Status' }
            value = { statusName }
            onClick = { () => statusNameFunc() }
            errorMessage = { statusName ? '' : statusNameErrorMessage }
            />
          <center>
            {
              editMode ?
              <GenericButton
                className = { 'global-button' }
                text = { 'Edit' }
                onClick = { () => submitForm() }
                />
                :
              <GenericButton
                className = { 'global-button' }
                text = { 'Save' }
                onClick = { () => submitForm() }
                />
            }
          </center>
        </div>
      </Modal>
    )
  }
}

FinancialObligationModal.propTypes = {
  amountFunc : PropTypes.func,
  bankNameInstitutionFunc : PropTypes.func,
  natureObligationFunc : PropTypes.func,
  statusNameFunc : PropTypes.func,
  onClose : PropTypes.func,
  submitForm : PropTypes.func,
  financeStatusFunc : PropTypes.func,
}
FinancialObligationModal.defaultProps={
}

export default FinancialObligationModal
