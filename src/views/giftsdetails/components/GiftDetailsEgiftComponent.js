import React, { Component } from 'react'
import { format } from '../../../utils/numberUtils'

class GiftDetailsEgiftComponent extends Component {

  render () {
    const {
      denominations,
      onCheckOutModal
    } = this.props

    return (
      <div id = { 'giftdetails-about-cover' }>
        <div id = { 'giftdetails-denominations' }>
          <h2>CHOOSE eGIFT</h2>
          <ul>
            {
              denominations && denominations.map((resp, key) =>
                <li
                  onClick = { () => onCheckOutModal(true, resp) }
                  key = { resp.id }
                  className = { 'giftdetails-denominations' }>
                  <img
                    className={ 'giftdetails-background' }
                    src={ `${ resp.logo }` }
                    style={{width: '300px'}}
                    alt={'P100'} />
                  <div className = { 'giftdetails-details' }>
                    <h4 className = { 'giftdetails-name' }>P{ resp.price }</h4>
                    <span className={'giftdetails-price'}>{ resp.points } Creds</span>
                    <p className={'giftdetails-description'}>{ resp.shortDescription ? resp.shortDescription : '(No description)'  }</p>
                  </div>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default GiftDetailsEgiftComponent
