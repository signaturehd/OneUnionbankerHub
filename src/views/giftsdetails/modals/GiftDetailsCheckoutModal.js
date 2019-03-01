import React, { Component } from 'react'
import { Modal, GenericButton, Line } from '../../../ub-components/'

import { format } from '../../../utils/numberUtils'

import './styles/giftModal.css'

class GiftDetailsCheckoutModal extends Component {

  checkAmountIf  () {

  }

  render () {
    const {
      onClose,
      onSelectThis,
      selectedRewardsArray,
      totalPoints,
      valueText,
      valueTextFunc,
      customValue,
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
      value: selectedRewardsArray.value,
      price: selectedRewardsArray.price,
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
              {
                !hasCustom &&

                <h4 className = { 'font-size-14px font-weight-600 unionbank-color-grey' }>
                  P { selectedRewardsArray && selectedRewardsArray.value }
                </h4>
              }
              {
                hasCustom && hasCustom &&
                <label name={ 'denomination-qty' } className={ 'denominations-dialog' }>
                  <span>Amount</span>
                  <input id={ 'denomination-qty' }
                    type={ 'text' }
                    onChange = { (e) => valueAmountTextFunc(e.target.value, selectedRewardsArray.price) }
                    value={ valueAmountText }/>
                </label>
              }
              {
                hasCustom && hasCustom ?
                <h4 className = { 'font-weight-lighter font-size-10px unionbank-color-grey' }>
                  { customValue && customValue.maximum && customValue.maximum.value } - { customValue && customValue.maximum && customValue.maximum.points }
                </h4>
                :
                <h4 className = { 'font-weight-lighter font-size-10px unionbank-color-grey' }>1 peso = 20pts</h4>
              }
            </div>
            <div className = { 'text-align-right' }>
              <h4 className = { 'unionbank-color font-weight-lighter font-size-14px' }>Total Points { totalPoints }</h4>
              <label name={ 'denomination-qty' } className={ 'denominations-dialog' }>
                <span>Qty</span>
                <input id={ 'denomination-qty' }
                  type={ 'text' }
                  max = { this.checkAmountIf(customValue) }
                  min = { customValue && customValue.minimun && customValue.minimun.value }
                  onChange = { (e) => {
                    if(hasCustom && hasCustom) {
                      valueAmountFunc(e.target.value)
                    } else {
                      valueTextFunc(e.target.value, selectedRewardsArray.price)
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
              {
                hasCustom && hasCustom ?

                <GenericButton
                  onClick = { () => onSelectThis(selectedRewardsArray, selectedGifts) }
                  text = { 'SELECT THIS' }
                  disabled = { valueAmountText ? false : true }
                  className = { `giftdetails-select${valueAmountText ? false : true}` }
                />
                :
                <GenericButton
                  onClick = { () => onSelectThis(selectedRewardsArray, selectedGifts) }
                  text = { 'SELECT THIS' }
                  disabled = { valueText ? false : true }
                  className = { `giftdetails-select${valueText ? false : true}` }
                />
              }
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default GiftDetailsCheckoutModal
