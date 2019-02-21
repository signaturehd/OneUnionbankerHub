import React, { Component } from 'react'
import { Modal, GenericButton, Line } from '../../../ub-components/'

import { format } from '../../../utils/numberUtils'

import './styles/giftModal.css'

class GiftDetailsCheckoutModal extends Component {

  render () {
    const {
      onClose,
      onSelectThis,
      selectedRewardsArray,
      totalPoints,
      valueText,
      valueTextFunc,
      hasCustom,
      valueAmountTextFunc,
      valueAmountText,
      valueAmountFunc,
      disabled,
    } = this.props

    let selectedGifts = {
      id: selectedRewardsArray.id,
      name: selectedRewardsArray.name,
      logo: selectedRewardsArray.logo,
      qty: valueText,
      totalPoints : totalPoints,
      value : selectedRewardsArray.value,
    }

    return (
      <Modal
        borderRadius = { '0px' }
        boxShadow = { 'none' }
        backgroundColor = { 'transparent' }
        >
        <div
          style = {{
            backgroundImage: `url(${selectedRewardsArray && selectedRewardsArray.logo})`
          }}
          className = { 'giftdetails-banner-modal' }>
        </div>
        <div style = {{
            backgroundColor: '#fff',
          }}>
          <div className = { 'giftdetails-modal-grid-quantiy' }>
            <div>
              <h4 className = { 'font-size-14px font-weight-600 unionbank-color-grey' }>
                { selectedRewardsArray && selectedRewardsArray.name }
              </h4>
              {
                hasCustom &&
                <label name={ 'denomination-qty' } className={ 'denominations-dialog' }>
                  <span>Amount</span>
                  <input id={ 'denomination-qty' }
                    type={ 'text' }
                    onChange = { (e) => valueAmountTextFunc(e.target.value, selectedRewardsArray.value) }
                    value={ valueAmountText }/>
                </label>
              }
              <h4 className = { 'font-weight-lighter font-size-10px unionbank-color-grey' }>1 peso = 20pts</h4>
            </div>
            <div className = { 'text-align-right' }>
              <h4 className = { 'unionbank-color font-weight-lighter font-size-14px' }>Total Points { totalPoints }</h4>
              <label name={ 'denomination-qty' } className={ 'denominations-dialog' }>
                <span>Qty</span>
                <input id={ 'denomination-qty' }
                  type={ 'text' }
                  max = { '100' }
                  onChange = { (e) => {
                    if(hasCustom) {
                      valueAmountFunc(e.target.value)
                    } else {
                      valueTextFunc(e.target.value, selectedRewardsArray.value)
                    }
                  } }
                  value={ valueText }/>
              </label>
            </div>
          </div>
          <div style = {{
              padding : '10px'
            }}>
            <Line/>
          </div>
          <p className = { 'giftdetails-modal-description' }>
            { selectedRewardsArray.shortDescription ? selectedRewardsArray.shortDescription : '(No Description Provided)' }
          </p>
          <div
            className = { 'grid-global padding-10px giftdetails-action' }>
            <div className = { 'text-align-left margin-auto' }>
              <GenericButton
                onClick = { () => onClose() }
                text = { 'CANCEL' }
                className = { 'giftdetails-cancel' }
              />
            </div>
            <div className = { 'text-align-right margin-auto' }>
              <GenericButton
                onClick = { () => onSelectThis(selectedRewardsArray, selectedGifts) }
                text = { 'SELECT THIS' }
                disabled = { disabled }
                className = { `giftdetails-select${disabled ? true : false}` }
              />
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default GiftDetailsCheckoutModal
