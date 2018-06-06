import React, { Component } from 'react'
import './styles/emergencyloan.css'
import { GenericTextBox,  Card, GenericButton } from '../../../ub-components/'

class EmergencyLoanForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      purposeOfAvailment: '',
      modeOfLoan: '',
      desiredAmount: '',
      termOfLoan: ''
    }
  }

  render () {
    return (
      <div className = {'mplview-container'}>
        <Card className = {'message'}>
          <h4>Emergency Loan</h4>
          <div className = {'message-body'}>
            <GenericTextBox
              onChange = { e => this.setState({ purposeOfAvailment: e.target.value }) }
              placeholder = { 'Purpose Of Availment' }
              type = { 'text' }/>
            <GenericTextBox
              onChange = { e => this.setState({ modeOfLoan: e.target.value }) }
              placeholder = { 'Mode of Loan' }
              type = { 'text' }/>
            <GenericTextBox
              onChange = { e => this.setState({ desiredAmount: e.target.value }) }
              placeholder = { 'Desired Amount' }
              type = { 'text' }/>
            <GenericTextBox
              onChange = { e => this.setState({ termOfLoan: e.target.value }) }
              placeholder = { 'Term of Loan' }
              type = { 'text' }/>
            <GenericButton
              type = { 'button' }
              text = 'Continue'
              className = {'mplview-submit' } />
          </div>
        </Card>
      </div>
    )
  }
}

export default EmergencyLoanForm
