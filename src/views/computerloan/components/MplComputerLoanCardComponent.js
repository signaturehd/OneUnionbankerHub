import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/computerLoanCardStyle.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class MplComputerLoanCardComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { } = this.state
    const { } = this.props

    return(
      <div className = {'mplview-container'}>

        <div className = { 'mpl-grid-column-2' }>
          <Card className = { 'mpl-form-card' }>
            <h4>
              Benefits Form
            </h4>
            <div className = {'mpl-form-card-body '}>
              <GenericTextBox
                type = 'button'
                value = { poaText }
                onClick = { () =>
                  this.setState({ showPurposeOfAvailment : true }) }
                onChange = { (poaText) =>
                  this.setState({ poaText }) }
                placeholder = { 'Purpose Of Availment' }
                type = { 'text' }/>
              <GenericTextBox
                onChange = { (modeOfLoanText) =>
                  this.setState({ modeOfLoanText }) }
                onClick = { () =>
                  this.setState({ showOffset : true }) }
                placeholder = { 'Mode of Loan' }
                value = { offset ? 'New Loan' : modeOoffsetfLoan }
                type = { 'text' }/>
              <GenericTextBox
                value = { amountValue }
                onChange = { this.onChange }
                placeholder = { 'Desired Amount' }
                maxLength = { validateLoanType && ( '' + validateLoanType.maximumLoanableAmount).length }
                type = { 'text' }/>
              <GenericTextBox
                value = { `Term: ${termOfLoan} Rate: ${rateOfLoan}` }
                onChange = { (termOfLoan, rateOfLoan) =>
                  this.setState({ termOfLoan, rateOfLoan }) }
                onClick = { () =>
                  this.setState({ showTerm : true }) }
                placeholder = { 'Term of Loan' }
                type = { 'text' }/>
              <GenericButton
                type = { 'button' }
                text = { 'continue' }
                onClick = { () => this.sendFormData(amountValue, modeOfLoanId, loanType, poaText, termId) }
                className = { 'mplview-submit' } />
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

MplComputerLoanCardComponent.propTypes = {
}

export default MplComputerLoanCardComponent
