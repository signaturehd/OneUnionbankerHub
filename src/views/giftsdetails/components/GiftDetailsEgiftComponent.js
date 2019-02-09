import React, { Component } from 'react'

class GiftDetailsEgiftComponent extends Component {

  render () {
    return (
      <div id = { 'giftdetails-denominations' }>
        <h2>CHOOSE eGIFT</h2>
        <ul>
          <li className = { 'giftdetails-denominations' }>
            <img className={ 'giftdetails-background' } src={"//s3.amazonaws.com/images.giftaway.ph/o/974ec3cd-7c8c-42d3-a689-aee2b907953e.jpg"} style={{width: '300px'}} alt={'P100'} />
            <div className = { 'giftdetails-details' }>
              <h4 className = { 'giftdetails-name' }>P100</h4>
              <span className={'giftdetails-price'}>110 Creds</span>
              <p className={'giftdetails-description'}>Can be used to buy groceries or pay bills</p>
            </div>
          </li>
          <li className = { 'giftdetails-denominations' }>
            <img className={ 'giftdetails-background' } src={"//s3.amazonaws.com/images.giftaway.ph/o/974ec3cd-7c8c-42d3-a689-aee2b907953e.jpg"} style={{width: '300px'}} alt={'P100'} />
            <div className = { 'giftdetails-details' }>
              <h4 className = { 'giftdetails-name' }>P100</h4>
              <span className={'giftdetails-price'}>110 Creds</span>
              <p className={'giftdetails-description'}>Can be used to buy groceries or pay bills</p>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default GiftDetailsEgiftComponent
