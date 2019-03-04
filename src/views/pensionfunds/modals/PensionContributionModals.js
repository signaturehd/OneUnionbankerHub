import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericInput, GenericButton, Modal, SliderComponent } from '../../../ub-components/'

import '../styles/fundsStyle.css'

import { format } from '../../../utils/numberUtils'

class PensionContributionModals extends Component {
  constructor (props) {
    super(props)
    this.state = {
      viewMessage: false
    }
  }

  render () {
    const {
      amountText,
      amountTextFunc,
      submitCodeFunc,
      cancelCodeFunc,
      continueCodeFunc,
      isBool,
      onCancelOption
    } = this.props

    const {
      viewMessage
    } = this.state

    return (
      <Modal
        isDismisable = { true }
        onClose = { () => cancelCodeFunc() }
        >
        {
          viewMessage ?
          <center>
          <h4 className = { 'unionbank-color font-size-16px' }>Opt out?</h4>
          <br/>
          <h4 className = { 'unionbank-color-grey font-size-16px' }>Are you sure you do not want to contribute to your pension fund anymore?</h4>
          <br/>
          <div className = { 'grid-global' }>
            <GenericButton
              text = { 'no' }
              className = { 'cusror-pointer global-button profile-button-small' }
              onClick = { () => this.setState({ viewMessage : false }) }
              />
            <GenericButton
              text = { 'yes' }
              className = { 'cusror-pointer global-button profile-button-small' }
              onClick = { () => {
                onCancelOption()
                this.setState({ viewMessage : true })
              } }
              />
            </div>
          </center>
          :
          <div>
            <div>
              <GenericInput
                text = { 'Slide Contribution Amount' }
                value = { amountText }
                onChange = { (e) => amountTextFunc(e.target.value, null) }
                />
              <SliderComponent
                onChangeValue = { (amount, e) => {
                  amountTextFunc(amount, e)} }
                min = { 100 }
                text = { '' }
                max = { 5000 }
              />
            </div>
            <center>
              <GenericButton
                className = { 'profile-button-small global-button cursor-pointer' }
                text = { `${ isBool && isBool === true ? 'Update' : 'Continue' }` }
                onClick = { () => {
                  continueCodeFunc()
                } }
                />
              <br/>
              <br/>
              <br/>
              <h4
                onClick = { () => this.setState({ viewMessage : true }) }
                className = { 'font-weight-bold font-size-14px cursor-pointer unionbank-color-grey' }>DISCONTINUE CONTRIBUTION</h4>
            </center>
          </div>
        }

      </Modal>
    )
  }
}

export default PensionContributionModals
