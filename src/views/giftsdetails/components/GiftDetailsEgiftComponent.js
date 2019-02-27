import React, { Component } from 'react'
import { format } from '../../../utils/numberUtils'

class GiftDetailsEgiftComponent extends Component {

  checkIdIfLast (id, lastId) {
    if(id === lastId) {
      return true
    } else {
      return false
    }
  }

  render () {
    const {
      denominations,
      onCheckOutModal,
      hasCustom
    } = this.props

    return (
      <div id = { 'giftdetails-about-cover' }>
        <div id = { 'giftdetails-denominations' }>
          <h2>CHOOSE eGIFT</h2>
          <ul>
            {
              denominations && denominations.map((resp, key) =>
                this.checkIdIfLast(resp.id, denominations[denominations.length - 1].id) ?
                <li
                  onClick = { () => onCheckOutModal(true, resp) }
                  key = { key }
                  className = { 'giftdetails-denominations' }>
                  <img
                    className={ 'giftdetails-background' }
                    src={ `${ resp.logo }` }
                    style={{width: '300px'}}
                    alt={'P100'} />
                  <div className = { 'giftdetails-details' }>
                    <h4 className = { 'giftdetails-name' }>Custom Value</h4>
                    <span className={'giftdetails-price'}>Custom Value</span>
                    <p className={'giftdetails-description'}>{ resp.shortDescription ? resp.shortDescription : '(No description)'  }</p>
                  </div>
                </li>
                :
                <li
                  onClick = { () => onCheckOutModal(true, resp) }
                  key = { key }
                  className = { 'giftdetails-denominations' }>
                  <img
                    className={ 'giftdetails-background' }
                    src={ `${ resp.logo }` }
                    style={{width: '300px'}}
                    alt={'P100'} />
                  <div className = { 'giftdetails-details' }>
                    <h4 className = { 'giftdetails-name' }>P{ resp.value }</h4>
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
