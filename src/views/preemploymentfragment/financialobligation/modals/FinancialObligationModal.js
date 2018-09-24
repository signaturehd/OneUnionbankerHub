import React, { Component } from 'react'
import PropTypes from 'prop-types'
import store from '../../../../store'
import { NotifyActions } from '../../../../actions'

import {
  Modal,
  GenericButton,
  MultipleFileUploader,
  MultipleAttachments,
  GenericInput,
  SingleInputModal,
  Line,
  DatePicker
} from '../../../../ub-components/'

import { format } from '../../../../utils/numberUtils'

import imageDefault from '../../../../images/profile-picture.png'


import { RequiredValidation } from '../../../../utils/validate/'
import moment from 'moment'

class FinancialObligationModal extends Component {

  constructor (props) {
    super (props)
  }

  render () {
    const {

    } = this.props

    return (
      <Modal
        onClose = { () => hideModalEducationFormFunc(false) }
        isDismisable = { true }
        width = { 50 }>
        <h2>Financial Obligation Form</h2>
          <div>
            <GenericInput
              text = { 'Name of the Bank/ Financial Institution' }
              value = { bankNameInstitution }
              onChange = { (e) => this.setState({ bankNameInstitution: e.target.value }) }
              errorMessage = { bankNameInstitution ? '' : bankNameInstitutionErrorMessage }
              />
            <GenericInput
              text = { 'Nature of Obligation' }
              value = { natureObligation }
              onChange = { (e) => this.setState({ natureObligation : e.target.value }) }
              errorMessage = { natureObligation ? '' : natureObligationErrorMessage }
              />
            <GenericInput
              text = { 'Amount' }
              value = { amount }
              type = { 'number' }
              onChange = { (e) => this.setState({ amount : e.target.value }) }
              errorMessage = { amount ? '' : amountErrorMessage }
              />
            <GenericInput
              text = { 'Status' }
              value = { statusName }
              onClick = { () => this.setState({ showFinanceStatusModal : true }) }
              errorMessage = { statusName ? '' : statusNameErrorMessage }
              />
            <center>
              <GenericButton
                className = { 'global-button' }
                text = { 'Save' }
                onClick = { () => this.submitForm() }
                />
            </center>
          </div>
      </Modal>
    )
  }
}

FinancialObligationModal.propTypes = {
  count : PropTypes.number,
  torFormData : PropTypes.array,
  addAttachmentsFunc : PropTypes.func,
  schoolName : PropTypes.string,
  studentNo : PropTypes.string,
  startYear : PropTypes.string,
  endYear : PropTypes.string,
  term : PropTypes.string,
  degree : PropTypes.string,
  honor : PropTypes.string,
  course : PropTypes.string,
  address : PropTypes.string,
}
FinancialObligationModal.defaultProps={
}

export default FinancialObligationModal
