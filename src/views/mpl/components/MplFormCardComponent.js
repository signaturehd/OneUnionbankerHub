import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/mplComponentStyle.css'
import { GenericTextBox,  Card, GenericButton } from '../../../ub-components/'

import PurposeOfAvailmentModal from '../../mpl/modals/PurposeOfAvailmentModal'
import ModeOfLoanModal from '../../mpl/modals/ModeOfLoanModal'
import TermOfLoanModal from '../../mpl/modals/TermOfLoanModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class MplFormCardComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPurposeOfAvailment: false,
      showOffset: false,
      showTerm: false,
      poaText : '',
      amountValue: '',
      modeOfLoan: '',
      termOfLoan: '',
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
     const amount = parseFloat(desiredAmount)
     const maximumAmount = parseFloat(this.props.validateLoanType.maximumLoanableAmount)
     if(amount >= maximumAmount) {
       store.dispatch(NotifyActions.addNotify({
           title : 'Warning' ,
           message : `You are only allowed to loan a maximum amount of ${ maximumAmount } `,
           type : 'warning',
           duration : 2000
         })
       )
     } else {
        this.props.presenter.addLoan(1, 'Personal',1, 1, 50000)
     }
   }

  render() {
    const {
      showPurposeOfAvailment,
      showOffset,
      showTerm,
      poaText,
      amountValue,
      modeOfLoan,
      termOfLoan } = this.state
    const {
      purposeOfAvailment,
      loanType,
      validateLoanType,
      preferredFormData,
      offset } = this.props
    return(
      <div className = {'mplview-container'}>
        {
          showOffset &&
          <ModeOfLoanModal
            offset  = {  offset && offset }
            onSubmit = { (changeOffsetValue, closePoaModal) =>
              this.setState({
                modeOfLoan : changeOffsetValue,
                showOffset : closePoaModal
              })
            }
            onClose = { () =>
              this.setState({ showOffset : false }) }
          />
        }
        {
          showPurposeOfAvailment &&
          <PurposeOfAvailmentModal
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
        {
          showTerm &&
          <TermOfLoanModal
            term  = {  validateLoanType && validateLoanType.terms }
            onSubmit = { (changeTermOfLoan, closePoaModal) =>
              this.setState({
                termOfLoan : changeTermOfLoan,
                showTerm : closePoaModal
              })
            }
            onClose = { () =>
              this.setState({ showTerm : false }) }
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
              onChange = { (modeOfLoan) =>
                this.setState({ modeOfLoan }) }
              onClick = { () =>
                this.setState({ showOffset : true }) }
              placeholder = { 'Mode of Loan' }
              value = { offset ? 'New Loan' : modeOfLoan }
              type = { 'text' }/>
            <GenericTextBox
              value = { amountValue }
              onChange = { this.onChange }
              placeholder = { 'Desired Amount' }
              type = { 'text' }/>
            <GenericTextBox
              value = { termOfLoan }
              onChange = { (termOfLoan) =>
                this.setState({ termOfLoan }) }
              onClick = { () =>
                this.setState({ showTerm : true }) }
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

MplFormCardComponent.propTypes = {
  purposeOfAvailment : PropTypes.array,
  validateLoanType : PropTypes.array,
  loanType : PropTypes.number,
  preferredFormData : PropTypes.func,
  offset : PropTypes.array
}

export default MplFormCardComponent
