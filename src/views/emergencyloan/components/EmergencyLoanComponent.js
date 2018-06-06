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
      termOfLoan: '',
      value: ''
    }
      this.onChange = this.onChange.bind(this)
  }
onChange (e) {
      const re = /^[0-9\.]+$/
      if (e.target.value == '' || re.test(e.target.value)) {
         this.setState({ value: e.target.value })
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
             value={this.state.value}
              onChange = {this.onChange}
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
