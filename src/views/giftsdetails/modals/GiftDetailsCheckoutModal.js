import React, { Component } from 'react'
import { Modal, GenericButton, Line } from '../../../ub-components/'

import './styles/giftModal.css'

class GiftDetailsCheckoutModal extends Component {

  render () {
    const {
      onClose,
      onSelectThis,
      selectedRewardsArray
    } = this.props

    return (
      <Modal
        borderRadius = { '0px' }
        boxShadow = { 'none' }
        backgroundColor = { 'transparent' }
        >
        <div
          style = {{
            backgroundImage: `url(${selectedRewardsArray.logo})`
          }}
          className = { 'giftdetails-banner-modal' }>
        </div>
        <div style = {{
            backgroundColor: '#fff',
          }}>
          <div className = { 'giftdetails-modal-grid-quantiy' }>
            <div>
              <h4 className = { 'font-size-14px font-weight-600 unionbank-color-grey' }>
                Steam Wallet 500
              </h4>
              <span className={'giftdetails-price'}>250 Creds</span>
            </div>
            <div className = { 'text-align-right' }>
              <label name={ 'denomination-qty' } className={ 'denominations-dialog' }>
                <span>Qty</span>
                <input id={ 'denomination-qty' }
                  type={ 'text' }
                  value={ '1' }/>
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
                onClick = { () => onSelectThis() }
                text = { 'SELECT THIS' }
                className = { 'giftdetails-select' }
              />
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default GiftDetailsCheckoutModal
