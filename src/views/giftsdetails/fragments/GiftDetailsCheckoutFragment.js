import React, { Component } from 'react'
import BannerImage from '../../../images/rewards/giftsBanner.jpg'
import { GenericButton, DatePicker, GenericInput, Line } from '../../../ub-components/'
import '../../gifts/styles/GiftsStyle.css'

import { format } from '../../../utils/numberUtils'

class GiftDetailsCheckoutFragment extends Component {

  render () {
    const {
      backToList,
      selectedRewardsArray,
      hasCustom,
      subTotalPoints,
      name,
      onCheckoutTransaction,
      deleteSelectedGifts
    } = this.props

    const totalRewards = selectedRewardsArray && selectedRewardsArray.map(function(resp) {
      return (resp.price * resp.qty) * 20
    })

    const totalPoints = totalRewards && totalRewards.reduce((a, b) => a + b, 0)

    return (
      <div style ={{
        backgroundImage: 'linear-gradient(#e6dada, transparent, transparent)',
        marginRight: '-50px',
        marginLeft: '-50px',
        marginTop: '-50px',
        }}>
        <div className={ 'gifts-checkout-container' }>
          <div className={ 'gifts-checkout-main-item' }>
            <div className = { 'text-align-left' }>
              <GenericButton
                className = { 'cursor-pointer global-button profile-button-small' }
                text = { 'Back' }
                onClick = { () => backToList() }
                />
            </div>
            <div className={ 'gift-checkout-title-h1' }>
              <h1 className = { 'font-weight-500 unionbank-color-grey' }>Your Order Details</h1>
            </div>
            <div>
              <h2 className={ 'gift-checkout-title' }>Selected eGift</h2>
              <table>
                <thead>
                  <tr>
                    <td className={ 'giftpadd' }></td>
                    <td className={ 'giftpadd gift-checkout-th-color-head gift-align-left-td' }>eGifts</td>
                    <td className={ 'giftpadd gift-checkout-th-color-head gift-align-right-td' }>Price</td>
                    <td className={ 'giftpadd gift-checkout-th-color-head gift-align-right-td' }>Qty</td>
                    <td className={ 'giftpadd gifts-border-style-double gift-checkout-th-color-head' }>Subtotal</td>
                  </tr>
                </thead>
                {
                  selectedRewardsArray &&
                  selectedRewardsArray.length === 0 ?
                  <tbody>
                    <td className={ 'giftpadd gift-align-left-td' }></td>
                    <td className={ 'giftpadd gift-align-left-td' }></td>
                    <td className={ 'giftpadd gift-align-right-td' }></td>
                    <td className={ 'giftpadd gift-align-right-td' }></td>
                    <td className={ 'giftpadd gifts-border-style-double' }></td>
                  </tbody>
                  :
                  selectedRewardsArray &&
                  selectedRewardsArray.map((resp, key) =>
                  <tbody key = { key }>
                    <tr className={ 'gift-checkout-hd-color' }>
                      <td
                        style = {{
                          display: 'grid',
                          gridTemplateColumns: '.1fr auto',
                        }}
                        className={ 'giftpadd' }>
                        <h4
                          onClick = { () =>
                             deleteSelectedGifts(resp.id, key)
                          }
                          className = { 'font-size-23px cursor-pointer' }
                          style = {{
                            margin : 'auto'
                          }}>&#x000D7;</h4>
                        <div
                          style = {{
                            backgroundImage:
                              `url(${ resp.logo })`,
                            backgroundSize: 'contain',
                            height: '50px',
                            width: '50px',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            margin: 'auto'
                          }}
                          />
                      </td>
                      <td className={ 'giftpadd gift-align-left-td gift-bold' } colSpan={ '3' }>{ name }</td>
                      <td className={ 'giftpadd gifts-border-style-double' }></td>
                    </tr>
                    <tr>
                      <td className={ 'giftpadd' }></td>
                      <td className={ 'giftpadd gift-align-right-td' }></td>
                    <td className={ 'giftpadd gift-align-right-td' }>{format(resp.price)}</td>
                      <td className={ 'giftpadd gift-align-right-td' }>{ resp.qty }</td>
                      <td className={ 'giftpadd gifts-border-style-double' }>{ format(resp.price * resp.qty * 20) } Creds</td>
                    </tr>
                  </tbody>
                  )
                }
              </table>
            </div>
          <div>
            <div className={ 'gift-margin' }>
              <span className={ 'gift-italic-label font-size-12px' }>This eGift will send to your email.</span>
            </div>
          </div>
          <Line/>
          <br/>
          <br/>
          </div>
          <div className={ 'gifts-checkout-main-item2' }>
            <div className={ 'gift-checkout-card-border' }>
              <div
                style = {{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  padding: '20px 15px'
                }}
                className={ 'gift-checkout-hd-color' }>
                <h2 className={ 'gift-checkout-title2' }>Checkout Summary</h2>
                <div className = { 'text-align-right' }>
                  <GenericButton
                    onClick = { () => onCheckoutTransaction() }
                    className = { 'cursor-pointer profile-button-small global-button' }
                    text={ 'CHECKOUT' }/>
                </div>
              </div>
              <div className={ 'gift-checkout-details' }>
                <div className={ 'gift-inline2' }>
                  <span className={ 'gift-checkout-label-textbox3 gift-align-left' }>Remaining Points</span>
                  <span className={ 'gift-checkout-label-textbox3 gift-align-right' }>{ format(subTotalPoints) }</span>
                </div>
                <div className={ 'gift-inline' }>
                  <span className={ 'gift-checkout-label-textbox2 gift-align-left' }>Total</span>
                  <span className={ 'gift-checkout-label-textbox2 gift-align-right' }>{ format(totalPoints) }</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default GiftDetailsCheckoutFragment
