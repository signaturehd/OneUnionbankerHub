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
      value: '',
    }
     this.onChange = this.onChange.bind(this)
  }
  onChange (e) {
      const re = /^[0-9\.]+$/
      if (e.target.value == '' || re.test(e.target.value)) {
         this.setState({ value: e.target.value })
      }
   }
   /*Change State*/

  render() {
    const { showPurposeOfAvailment, poaText } = this.state
    const { purposeOfAvailment, types} = this.props

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
          <h4> Benefits Form </h4>
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
              value = {this.state.value}
              onChange = {this.onChange}
              placeholder = { 'Desired Amount' }
              type = { 'text' }/>
            <GenericTextBox
              onChange = { e =>
                this.setState({ termOfLoan: e.target.value }) }
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

MPLFormComponent.propTypes = {
  purposeOfAvailment : PropTypes.array,
  types : PropTypes.array,
}

export default MPLFormComponent
