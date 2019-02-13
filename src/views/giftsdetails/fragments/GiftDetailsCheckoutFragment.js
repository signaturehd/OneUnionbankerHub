import React, { Component } from 'react'
import BannerImage from '../../../images/rewards/giftsBanner.jpg'
import GiftDetailsFooterComponent from '../components/GiftDetailsFooterComponent'
import { GenericButton, DatePicker, GenericInput, Line } from '../../../ub-components/'

class GiftDetailsCheckoutFragment extends Component {

  render () {
    const {
      backToList,
    } = this.props

    return (
      <div>
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
              <h1>Your Order Details</h1>
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
                <tbody>
                  <tr className={ 'giftpadd gift-checkout-hd-color' }>
                    <td className={ 'giftpadd' }
                      style = {{
                        backgroundImage:
                          `url(${ 'http://s3.amazonaws.com/images.giftaway.ph/o/cce13efb-67a6-43e5-82dd-ef084fbd6ec0.png' })`,
                        backgroundSize: 'contain',
                        height: '20px',
                        width: '20px',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        margin: 'auto',
                    }}></td>
                    <td className={ 'giftpadd gift-align-left-td gift-bold' } colSpan={ '3' }>SM Gift Pass</td>
                    <td className={ 'giftpadd gifts-border-style-double' }></td>
                  </tr>
                  <tr>
                    <td className={ 'giftpadd' }></td>
                    <td className={ 'giftpadd gift-align-left-td' }>P500</td>
                    <td className={ 'giftpadd gift-align-right-td' }>550 Creds</td>
                    <td className={ 'giftpadd gift-align-right-td' }>1</td>
                    <td className={ 'giftpadd gifts-border-style-double' }>550 Creds</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h2 className={ 'gift-checkout-title gift-checkout-label-textbox' }>Your Recipient Details</h2>
              <div className={ 'gift-margin' }>
                <span className={ 'gift-italic-label' }>How do you want us to send this eGift</span>
              </div>
              <div>
                <form>
                  <div className="radio">
                    <label className="gifts-radio gift-checkout-label-textbox">
                      <input type="radio" value="radioemail"/>
                        EMAIL
                    </label>
                  </div>
                  <div className="radio">
                    <label className="gifts-radio gift-checkout-label-textbox">
                      <input type="radio" value="radiosms" />
                        SMS
                    </label>
                  </div>
                  <div className="radio">
                    <label className="gifts-radio gift-checkout-label-textbox">
                      <input type="radio" value="radioboth"/>
                        BOTH
                    </label>
                  </div>
                </form>
              </div>
            <br/>
            <br/>
              <div>
              <h4 className={ 'gift-margin-up gift-checkout-label-textbox' }>RECIPIENT NAME</h4>
                <GenericInput/>
              </div>
              <div>
              <h4 className={ 'gift-checkout-label-textbox' }>RECIPIENT EMAIL</h4>
                <GenericInput/>
              </div>
              <div>
              <h4 className={ 'gift-checkout-label-textbox' }>PHILIPPINE MOBILE NO.</h4>
                <GenericInput/>
              </div>
              <div>
              <h4 className={ 'gift-checkout-label-textbox' }>MESSAGE TO RECIPIENT</h4>
                <GenericInput
                  type={ 'textarea' }
                />
              </div>
              <h4 className={ 'gift-checkout-label-textbox' }>SEND THIS ON</h4>
              <div>
                <DatePicker/>
              </div>
            </div>
            <Line
              className={ 'gift-margin' }
            />
            <div>
              <h2 className={ 'gift-checkout-title' }>Your Details</h2>
              <div className={ 'gift-margin' }>
                <span className={ 'gift-italic-label' }>Fill out your personal details</span>
              </div>
              <div>
              <h4 className={ 'gift-checkout-label-textbox' }>YOUR NAME</h4>
                <GenericInput/>
              </div>
              <div>
              <h4 className={ 'gift-checkout-label-textbox' }>YOUR EMAIL</h4>
                <GenericInput/>
              </div>
              <div>
              <h4 className={ 'gift-checkout-label-textbox' }>YOUR MOBILE NO.</h4>
                <GenericInput/>
              </div>
            </div>
            <Line
              className={ 'gift-margin' }
            />
            <div>
              <h2 className={ 'gift-checkout-title' }>Tracking</h2>
              <div>
              <h4 className={ 'gift-checkout-label-textbox' }>REFERENCE#</h4>
                <GenericInput/>
              </div>
              <div>
              <h4 className={ 'gift-checkout-label-textbox' }>CAMPAIGN TAG</h4>
                <GenericInput/>
              </div>
            </div>
            <Line
              className={ 'gift-margin' }
            />
            <div className={ 'gift-margin-button' }>
              <GenericButton
                text={ 'CHECKOUT' }/>
            </div>
          </div>
          <div className={ 'gifts-checkout-main-item2' }>
            <div className={ 'gift-checkout-card-border' }>
              <div className={ 'gift-checkout-hd-color' }>
                <h2 className={ 'gift-checkout-title2' }>Checkout Summary</h2>
              </div>
              <div className={ 'gift-checkout-details' }>
                <div className={ 'gift-inline2' }>
                  <span className={ 'gift-checkout-label-textbox3 gift-align-left' }>Your Credits</span>
                  <span className={ 'gift-checkout-label-textbox3 gift-align-right' }>44,250.00</span>
                </div>
                <div className={ 'gift-inline' }>
                  <span className={ 'gift-checkout-label-textbox2 gift-align-left' }>Total</span>
                  <span className={ 'gift-checkout-label-textbox2 gift-align-right' }>550.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <GiftDetailsFooterComponent/>
        </div>
      </div>
    )
  }
}


export default GiftDetailsCheckoutFragment
