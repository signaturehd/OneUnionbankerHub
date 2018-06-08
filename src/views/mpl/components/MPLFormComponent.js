import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/mplComponentStyle.css'
import { GenericTextBox,  Card, GenericButton } from '../../../ub-components/'

import MPLPurposeOfAvailmentModal from '../../mpl/modals/MPLPurposeOfAvailmentModal'

class MPLFormComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPurposeOfAvailment: false,
      poaText : '',
      amountValue: '',
    }
     this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
      const re = /^[0-9\.]+$/
      if (e.target.value == '' ||  re.test(e.target.value)) {
        this.setState({ amountValue: e.target.value })
      }
   }

   sendFormData (desiredAmount, modeLoan, loanTypeId, purposeOfAvailmentId ) {
     if(parseInt(desiredAmount) >=  this.props.validateLoanType.maximumLoanableAmount) {
       console.log("max")
     } else {
        this.props.presenter.addLoan(1, 'Personal',1, 1, 50000)
     }
   }

  render() {
    const { showPurposeOfAvailment, poaText, amountValue } = this.state
    const { purposeOfAvailment, loanType, validateLoanType, preferredFormData } = this.props
    return(
      <div className = {'mplview-container'}>
        {
          showPurposeOfAvailment &&
          <MPLPurposeOfAvailmentModal
            purposeOfAvailment  = {  purposeOfAvailment && purposeOfAvailment.category }
            onSubmit = { (changePoaText, closePoaModal) =>
              this.setState({
                poaText : changePoaText,
                showPurposeOfAvailment : closePoaModal
              })
            }
            onClose = { () =>
              this.setState({ showPurposeOfAvailment : false }) }
          />
        }
        <Card className = {'message'}>
          <h4>
            Benefits Form
          </h4>
          <div className = {'message-body'}>
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
              onChange = { e =>
                this.setState({ modeOfLoan: e.target.value }) }
              placeholder = { 'Mode of Loan' }
              type = { 'text' }/>
            <GenericTextBox
              value = { amountValue }
              onChange = { this.onChange }
              placeholder = { 'Desired Amount' }
              type = { 'text' }/>
            <GenericTextBox
              onChange = { e =>
                this.setState({ termOfLoan: e.target.value }) }
              placeholder = { 'Term of Loan' }
              type = { 'text' }/>
            <GenericButton
              type = { 'button' }
              text = { 'continue' }
              onClick = { () => this.sendFormData(amountValue, null, null, null) }
              className = {'mplview-submit' } />
          </div>
        </Card>
      </div>
    )
  }
}

MPLFormComponent.propTypes = {
  purposeOfAvailment : PropTypes.array,
  validateLoanType : PropTypes.array,
  loanType : PropTypes.number,
  preferredFormData : PropTypes.func,
}

export default MPLFormComponent
